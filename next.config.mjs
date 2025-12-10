/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url';
import path from 'path';
import { fileURLToPath as fileURLToPathUtil } from 'url';

const __filename = fileURLToPathUtil(import.meta.url);
const __dirname = path.dirname(__filename);

// Get absolute path to project root (where package.json and next.config.mjs are located)
const projectRoot = path.resolve(__dirname);

const nextConfig = {
  reactStrictMode: true,
  // Turbopack configuration (Next.js 16+)
  // Explicitly set project root to fix workspace detection issue
  // This tells Next.js where to find the app directory (src/app/)
  turbopack: {
    root: projectRoot, // Absolute path to project root
  },
};

export default nextConfig;
