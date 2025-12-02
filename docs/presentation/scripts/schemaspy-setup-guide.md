# SchemaSpy Setup Guide

## Overview

SchemaSpy generates beautiful, interactive HTML documentation of your database schema with:
- Complete ER diagrams
- Table details with relationships
- Index information
- Constraint details
- Interactive navigation

## Prerequisites

1. **Java JRE 8 or higher**
   - Download: https://www.java.com/download/
   - Verify: `java -version`

2. **GraphViz** (optional but recommended for diagrams)
   - **Windows**: Download from https://graphviz.org/download/
   - **Mac**: `brew install graphviz`
   - **Linux**: `sudo apt-get install graphviz`
   - Verify: `dot -V`

3. **PostgreSQL JDBC Driver**
   - Will be downloaded automatically by script
   - Or download manually: https://jdbc.postgresql.org/download/

## Quick Start

### Option 1: Automated Script (Recommended)

**Linux/Mac:**
```bash
cd presentation/scripts
chmod +x generate-schemaspy-docs.sh
./generate-schemaspy-docs.sh
```

**Windows:**
```cmd
cd presentation\scripts
generate-schemaspy-docs.bat
```

### Option 2: Manual Setup

1. **Download SchemaSpy:**
   ```bash
   cd presentation/scripts/schemaspy
   wget https://github.com/schemaspy/schemaspy/releases/download/v6.2.4/schemaspy-6.2.4.jar
   ```

2. **Download PostgreSQL Driver:**
   ```bash
   wget https://jdbc.postgresql.org/download/postgresql-42.6.0.jar
   ```

3. **Run SchemaSpy:**
   ```bash
   java -jar schemaspy-6.2.4.jar \
     -t pgsql \
     -dp postgresql-42.6.0.jar \
     -db workconnect_db \
     -host localhost \
     -port 5432 \
     -u postgres \
     -p YOUR_PASSWORD \
     -o ../../docs/schemaspy \
     -s public \
     -noads \
     -hq
   ```

## Output

After generation, open:
```
presentation/docs/schemaspy/index.html
```

### Features of Generated Documentation

1. **Homepage**: Overview with statistics
2. **Tables**: List of all tables with details
3. **ER Diagrams**: Visual relationship diagrams
4. **Anomalies**: Potential issues detected
5. **Constraints**: All constraints listed
6. **Routines**: Functions and procedures

## Customization

### Include Only Specific Tables

Add `-i` parameter with table name pattern:
```bash
java -jar schemaspy-6.2.4.jar ... -i "produto|venda|cliente"
```

### Exclude Tables

Add `-x` parameter:
```bash
java -jar schemaspy-6.2.4.jar ... -x "auditoria_lgpd"
```

### Custom CSS Styling

1. Generate documentation
2. Edit `presentation/docs/schemaspy/css/schemaspy.css`
3. Customize colors, fonts, layout

## Troubleshooting

**Problem: "Java not found"**
- Solution: Install Java JRE and add to PATH
- Verify: `java -version`

**Problem: "GraphViz not found"**
- Solution: Install GraphViz
- Note: Documentation will still generate, just without diagrams

**Problem: "Connection refused"**
- Solution: Ensure PostgreSQL is running
- Check: `psql -U postgres -d workconnect_db -c "SELECT 1;"`

**Problem: "Driver not found"**
- Solution: Ensure PostgreSQL JDBC driver is in same directory as SchemaSpy JAR
- Or specify full path with `-dp` parameter

## Presentation Tips

1. **Open in browser** before presentation
2. **Bookmark key pages**: Tables, ER Diagrams, Anomalies
3. **Use search** (Ctrl+F) to quickly find tables
4. **Show ER diagrams** - they're interactive!
5. **Navigate relationships** - click on FK links

## Integration with Presentation

1. Generate documentation before exam
2. Open `index.html` in browser
3. Keep browser tab ready for live demo
4. Use as reference during Q&A

## Advanced Options

### Generate PDF Report

```bash
java -jar schemaspy-6.2.4.jar ... -pdf
```

### Include View Definitions

```bash
java -jar schemaspy-6.2.4.jar ... -views
```

### Custom Output Format

```bash
java -jar schemaspy-6.2.4.jar ... -format html/pdf
```

## File Structure

After generation:
```
presentation/docs/schemaspy/
├── index.html          # Main entry point
├── tables/             # Table detail pages
├── diagrams/           # ER diagrams
├── css/                # Stylesheets
├── images/             # Diagram images
└── ...
```

## Next Steps

After generating documentation:
1. Open `index.html` in browser
2. Explore the interactive documentation
3. Bookmark important pages
4. Use during live presentation

