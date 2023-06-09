import pino from 'pino';

import { sendToSentry } from './sentry';
import { Optional } from './types';

const PinoInstance = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
    level: 'info',
  },
});

function log(
  message: string,
  originalError: Optional<Error & { parent?: any; original?: any }>,
  logFunction: (msg: string) => void,
) {
  let errorString = '';
  if (originalError) {
    errorString += originalError.stack;
    // in some cases (for example Sequelize errors) the error may contain a parent error that contains the useful information
    if (originalError.parent) {
      errorString += `\nparent exception: ${originalError.parent}`;
    } else if (originalError.original) {
      errorString += `\nparent exception: ${originalError.original}`;
    }
  }
  const loggedMessage: string = originalError ? `${message}: ${errorString}` : message;
  logFunction(loggedMessage);
}

interface Logger {
  trace: (message: string, originalError?: unknown) => void;
  debug: (message: string, originalError?: unknown) => void;
  info: (message: string, originalError?: unknown) => void;
  warn: (message: string, originalError?: unknown) => void;
  error: (message: string, originalError: unknown, allowCopyToSentry?: boolean) => void;
  fatal: (message: string, originalError: unknown, allowCopyToSentry?: boolean) => void;
}

const logger: Logger = {
  trace: (message: string, originalError?: unknown): void => {
    log(message, originalError as Error, PinoInstance.trace.bind(PinoInstance));
  },
  debug: (message: string, originalError?: unknown): void => {
    log(message, originalError as Error, PinoInstance.debug.bind(PinoInstance));
  },
  info: (message: string, originalError?: unknown): void => {
    log(message, originalError as Error, PinoInstance.info.bind(PinoInstance));
  },
  warn: (message: string, originalError?: unknown): void => {
    log(message, originalError as Error, PinoInstance.warn.bind(PinoInstance));
  },
  error: (message: string, originalError: unknown, allowCopyToSentry: boolean = true): void => {
    log(message, originalError as Error, PinoInstance.error.bind(PinoInstance));
    if (allowCopyToSentry) {
      sendToSentry(message, originalError as Error);
    }
  },
  fatal: (message: string, originalError: unknown, allowCopyToSentry: boolean = true): void => {
    log(message, originalError as Error, PinoInstance.fatal.bind(PinoInstance));
    if (allowCopyToSentry) {
      sendToSentry(message, originalError as Error);
    }
  },
};

export default logger;
