import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://9396e8c089c90dc7431927e76994ea83@o4510903332175872.ingest.us.sentry.io/4510903334469632",

  // Define how likely traces are sampled. Adjust this value in production,
  // or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
