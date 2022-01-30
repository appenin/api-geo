import { Pool } from 'pg';

import { SqlPoolWrapper } from '../libs/pool-wrapper';
import { config } from './';

export const database = new Pool({
  user: config.FALCO_GEO_DB_USER,
  database: config.FALCO_GEO_DB,
  password: config.FALCO_GEO_DB_PASSWORD,
  port: config.FALCO_GEO_DB_PORT,
  host: config.FALCO_GEO_DB_HOST,
});

export const poolWrapper = new SqlPoolWrapper(database);
