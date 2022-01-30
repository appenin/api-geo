/* eslint-disable no-console */
import './config/augmentations';

import Hapi from '@hapi/hapi';
import * as dotenv from 'dotenv';

import { pgisConfig, plugins } from './config';
import { usecases } from './domain';
import logger from './libs/logger';
import { initSentry } from './libs/sentry';
import { routes } from './routes';

dotenv.config();

const server = Hapi.server(pgisConfig);

const init = async () => {
  initSentry();

  server.bind(usecases);

  await server.register(plugins);
  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  logger.fatal('Server down: ', err);
  process.exit(1);
});

init();
