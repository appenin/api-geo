import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiPostgresConnection from 'hapi-postgres-connection';
import HapiSwagger from 'hapi-swagger';

import { config } from './';
import { swaggerOptions } from './swagger.options';

export const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: HapiPostgresConnection,
    options: {
      connectionString: config.DATABASE_URL,
    },
  },
  {
    plugin: Inert,
  },
  {
    plugin: Vision,
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
];
