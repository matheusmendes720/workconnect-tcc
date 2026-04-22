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
  typescript: {
    ignoreBuildErrors: true,
  },
  // Turbopack configuration (Next.js 16+)
  turbopack: {
    root: projectRoot,
  },
  // Serve Docusaurus documentation as a subpage
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: '/docs/index.html',
      },
      {
        source: '/docs/:path*',
        destination: '/docs/:path*',
      },
    ];
  },
};

export default nextConfig;
