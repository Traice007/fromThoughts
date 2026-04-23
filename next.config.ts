import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://fromthoughts.com" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "fromthoughts",
  project: "fromthoughts",

  // Silent in CI to avoid noisy output
  silent: !process.env.CI,

  // Upload source maps so Sentry stack traces show original TypeScript
  widenClientFileUpload: true,

  // Route Sentry requests through a proxy to avoid ad blockers
  tunnelRoute: "/monitoring",

  // Hide source maps from the client bundle
  sourcemaps: {
    disable: false,
    deleteSourcemapsAfterUpload: true,
  },

  // Automatically instrument Server Components and Route Handlers
  webpack: {
    autoInstrumentServerFunctions: true,
  },
});
