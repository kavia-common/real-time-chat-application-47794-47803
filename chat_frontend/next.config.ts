import type { NextConfig } from "next";

/**
 * Next.js is configured for static export.
 * - Use `npm run build` to build and export to `out/`.
 * - Use `npm start` to serve the static `out/` directory.
 * Avoid running `next start` with output: "export" to prevent server runtime chunk mismatches.
 */
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
