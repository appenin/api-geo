import { PoolClient } from 'pg';

declare module '@hapi/hapi' {
  interface Request {
    pg: { client: PoolClient };
  }
}
