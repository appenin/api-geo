import pino from 'pino';

const PinoInstance = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
    level: 'info',
  },
});

export default PinoInstance;
