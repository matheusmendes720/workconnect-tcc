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
  // Serve Docusaurus documentation as a subpage at /docs.
  // Docusaurus generates index.html in every subfolder (e.g.
  // /docs/estrategia/bmc-canvas/index.html). Next.js's default
  // `trailingSlash: false` 308-redirects `/docs/.../` → `/docs/...`,
  // which then 404s because there is no /docs/estrategia/bmc-canvas file
  // (only /docs/estrategia/bmc-canvas/index.html).
  //
  // Rewrites below flatten the redirect by mapping both slash variants
  // straight to the underlying index.html / asset.
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: '/docs/index.html',
      },
      {
        source: '/docs/:path*/',
        destination: '/docs/:path*/index.html',
      },
      {
        source: '/docs/:path*',
        destination: '/docs/:path*/index.html',
      },
    ];
  },
};

export default nextConfig;
