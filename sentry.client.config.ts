import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Percentage of sessions to record for replay (0 = none, 1 = all)
  // At 0% we capture replays only on errors — no privacy concerns, low storage cost
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,

  // Capture 10% of performance traces — enough to spot slow pages without noise
  tracesSampleRate: 0.1,

  integrations: [
    Sentry.replayIntegration({
      // Mask all text and inputs so no sensitive user data is recorded
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
