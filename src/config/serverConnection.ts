import { config } from './';

export const pgisConfig = {
  port: config.FALCO_GEO_PORT,
  host: config.FALCO_GEO_HOST,
  routes: {
    cors: {
      origin: ['*'],
    },
  },
};
