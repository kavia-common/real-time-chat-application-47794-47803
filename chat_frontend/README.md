# Chat Frontend

This project uses Next.js App Router and is configured for static export.

How to run locally:
- Development (hot reload): 
  - npm install
  - npm run dev
- Production preview (static export):
  - npm run build
  - npm start

Notes:
- The build uses `output: "export"` in next.config.ts. Do not run `next start` directly against an export build; use `npm start` which serves the `out/` directory.
- If switching between dev and export builds, a stale `.next` cache can cause a runtime chunk mismatch (e.g., "Cannot find module './710.js'"). The build script automatically cleans `.next` and `out` before building. You can also run `npm run clean` manually.

Environment variables (set as NEXT_PUBLIC_*):
- NEXT_PUBLIC_API_BASE
- NEXT_PUBLIC_BACKEND_URL
- NEXT_PUBLIC_FRONTEND_URL
- NEXT_PUBLIC_WS_URL
- NEXT_PUBLIC_NODE_ENV
- NEXT_PUBLIC_NEXT_TELEMETRY_DISABLED
- NEXT_PUBLIC_ENABLE_SOURCE_MAPS
- NEXT_PUBLIC_PORT
- NEXT_PUBLIC_TRUST_PROXY
- NEXT_PUBLIC_LOG_LEVEL
- NEXT_PUBLIC_HEALTHCHECK_PATH
- NEXT_PUBLIC_FEATURE_FLAGS
- NEXT_PUBLIC_EXPERIMENTS_ENABLED
