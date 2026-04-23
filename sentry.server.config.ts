import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Capture 10% of traces — enough for performance insight
  tracesSampleRate: 0.1,

  // Do not print Sentry debug output in production logs
  debug: false,
});
