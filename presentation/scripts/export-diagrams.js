#!/usr/bin/env node
/**
 * WorkConnect - Diagram Export Script
 * 
 * Exports Mermaid diagrams from Markdown files to PNG and SVG formats
 * 
 * Requirements:
 * - Node.js 14+
 * - @mermaid-js/mermaid-cli installed globally or locally
 * 
 * Usage:
 *   node export-diagrams.js
 * 
 * Or with npm:
 *   npm run export-diagrams
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
    // Source directory containing markdown files with Mermaid diagrams
    sourceDir: path.join(__dirname, '../documentation/diagrams'),
    
    // Output directory for exported images
    outputDir: path.join(__dirname, '../diagrams/exports'),
    
    // Mermaid source files directory
    mermaidDir: path.join(__dirname, '../diagrams/mermaid'),
    
    // Diagrams to export
    diagrams: [
        {
            name: 'erd-conceitual',
            sourceFile: 'erd-conceitual.md',
            title: 'ERD Conceitual'
        },
        {
            name: 'eer-logico',
            sourceFile: 'eer-logico.md',
            title: 'EER Lógico'
        },
        {
            name: 'casos-de-uso',
            sourceFile: 'casos-de-uso.md',
            title: 'Casos de Uso'
        }
    ],
    
    // Export settings
    png: {
        width: 2400,
        height: 1800,
        backgroundColor: '#ffffff'
    },
    
    svg: {
        backgroundColor: 'transparent'
    }
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

/**
 * Log colored messages
 */
function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Check if @mermaid-js/mermaid-cli is installed
 */
function checkMermaidCLI() {
    try {
        // Try npx first (local install), then global
        try {
            execSync('npx mmdc --version', { stdio: 'ignore' });
            return true;
        } catch (error) {
            execSync('mmdc --version', { stdio: 'ignore' });
            return true;
        }
    } catch (error) {
        return false;
    }
}

/**
 * Extract Mermaid diagram code from Markdown file
 */
function extractMermaidCode(markdownFile) {
    const content = fs.readFileSync(markdownFile, 'utf8');
    const mermaidBlocks = [];
    
    // Match mermaid code blocks (handle both \n and \r\n line endings)
    const regex = /```mermaid\r?\n([\s\S]*?)```/g;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
        mermaidBlocks.push(match[1].trim());
    }
    
    return mermaidBlocks;
}

/**
 * Create output directories if they don't exist
 */
function ensureDirectories() {
    const dirs = [
        CONFIG.outputDir,
        path.join(CONFIG.outputDir, 'png'),
        path.join(CONFIG.outputDir, 'svg'),
        CONFIG.mermaidDir
    ];
    
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            log(`Created directory: ${dir}`, 'cyan');
        }
    });
}

/**
 * Export diagram to PNG
 */
function exportToPNG(mermaidFile, outputFile) {
    try {
        // Use npx to run locally installed mmdc
        const command = `npx mmdc -i "${mermaidFile}" -o "${outputFile}" -w ${CONFIG.png.width} -H ${CONFIG.png.height} -b ${CONFIG.png.backgroundColor}`;
        execSync(command, { stdio: 'inherit', shell: true });
        return true;
    } catch (error) {
        log(`Error exporting to PNG: ${error.message}`, 'red');
        return false;
    }
}

/**
 * Export diagram to SVG
 */
function exportToSVG(mermaidFile, outputFile) {
    try {
        // Use npx to run locally installed mmdc
        const command = `npx mmdc -i "${mermaidFile}" -o "${outputFile}" -b ${CONFIG.svg.backgroundColor}`;
        execSync(command, { stdio: 'inherit', shell: true });
        return true;
    } catch (error) {
        log(`Error exporting to SVG: ${error.message}`, 'red');
        return false;
    }
}

/**
 * Process a single diagram
 */
function processDiagram(diagram) {
    log(`\n${'='.repeat(60)}`, 'bright');
    log(`Processing: ${diagram.title}`, 'bright');
    log('='.repeat(60), 'bright');
    
    const sourceFile = path.join(CONFIG.sourceDir, diagram.sourceFile);
    
    // Check if source file exists
    if (!fs.existsSync(sourceFile)) {
        log(`❌ Source file not found: ${sourceFile}`, 'red');
        return false;
    }
    
    // Extract Mermaid code
    const mermaidBlocks = extractMermaidCode(sourceFile);
    
    if (mermaidBlocks.length === 0) {
        log(`⚠️  No Mermaid diagrams found in ${diagram.sourceFile}`, 'yellow');
        return false;
    }
    
    log(`Found ${mermaidBlocks.length} diagram(s)`, 'cyan');
    
    // Use the first diagram (or combine if multiple)
    const mermaidCode = mermaidBlocks[0];
    
    // Save Mermaid code to .mmd file
    const mermaidFile = path.join(CONFIG.mermaidDir, `${diagram.name}.mmd`);
    fs.writeFileSync(mermaidFile, mermaidCode, 'utf8');
    log(`✓ Saved Mermaid source: ${mermaidFile}`, 'green');
    
    // Export to PNG
    const pngFile = path.join(CONFIG.outputDir, 'png', `${diagram.name}.png`);
    log(`Exporting to PNG...`, 'cyan');
    if (exportToPNG(mermaidFile, pngFile)) {
        log(`✓ PNG exported: ${pngFile}`, 'green');
    } else {
        return false;
    }
    
    // Export to SVG
    const svgFile = path.join(CONFIG.outputDir, 'svg', `${diagram.name}.svg`);
    log(`Exporting to SVG...`, 'cyan');
    if (exportToSVG(mermaidFile, svgFile)) {
        log(`✓ SVG exported: ${svgFile}`, 'green');
    } else {
        return false;
    }
    
    return true;
}

/**
 * Main function
 */
function main() {
    log('\n' + '='.repeat(60), 'bright');
    log('WorkConnect - Diagram Export Script', 'bright');
    log('='.repeat(60), 'bright');
    
    // Check if mermaid-cli is installed
    log('\nChecking dependencies...', 'cyan');
    if (!checkMermaidCLI()) {
        log('\n❌ @mermaid-js/mermaid-cli is not installed!', 'red');
        log('\nPlease install it using one of the following methods:', 'yellow');
        log('  npm install -g @mermaid-js/mermaid-cli', 'cyan');
        log('  OR', 'yellow');
        log('  npm install --save-dev @mermaid-js/mermaid-cli', 'cyan');
        log('\nThen run this script again.', 'yellow');
        process.exit(1);
    }
    
    log('✓ @mermaid-js/mermaid-cli is installed', 'green');
    
    // Ensure directories exist
    log('\nPreparing directories...', 'cyan');
    ensureDirectories();
    
    // Process each diagram
    let successCount = 0;
    let failCount = 0;
    
    CONFIG.diagrams.forEach(diagram => {
        if (processDiagram(diagram)) {
            successCount++;
        } else {
            failCount++;
        }
    });
    
    // Summary
    log('\n' + '='.repeat(60), 'bright');
    log('Export Summary', 'bright');
    log('='.repeat(60), 'bright');
    log(`✓ Successfully exported: ${successCount}`, 'green');
    if (failCount > 0) {
        log(`✗ Failed: ${failCount}`, 'red');
    }
    log('\nExported files:', 'cyan');
    log(`  PNG: ${path.join(CONFIG.outputDir, 'png')}`, 'cyan');
    log(`  SVG: ${path.join(CONFIG.outputDir, 'svg')}`, 'cyan');
    log(`  Mermaid source: ${CONFIG.mermaidDir}`, 'cyan');
    log('\n' + '='.repeat(60) + '\n', 'bright');
}

// Run main function
if (require.main === module) {
    main();
}

module.exports = { processDiagram, extractMermaidCode, CONFIG };

