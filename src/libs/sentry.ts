import * as Sentry from '@sentry/node';

import { config } from '../config';

let initialized: boolean = false;

export const isSentryActive = () => initialized;

export function initSentry() {
  // Sentry is activable if the configuration specifies a DSN to report errors to.
  const isSentryActivable: boolean = Boolean(config.FALCO_GEO_SENTRY_DSN);
  if (!isSentryActivable) {
    return;
  }

  const sentryConfig: Sentry.NodeOptions = {
    dsn: config.FALCO_GEO_SENTRY_DSN,
    environment: config.FALCO_GEO_API_ENV,
    normalizeDepth: 10,
  };

  Sentry.init(sentryConfig);
  initialized = true;
}

export function sendToSentry(message: string, originalError: Error) {
  if (!isSentryActive()) return;

  Sentry.captureException(originalError, {
    contexts: { logger: { message, stack: originalError.stack } },
    tags: { source: 'LogWithError' },
  });
}
