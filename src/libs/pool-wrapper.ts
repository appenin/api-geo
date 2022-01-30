import { Pool, QueryConfig, QueryResult, QueryResultRow } from 'pg';

export interface PoolWrapper {
  query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    values?: I,
  ): Promise<QueryResult<R>>;
}

export class SqlPoolWrapper implements PoolWrapper {
  constructor(private readonly pool: Pool) {}
  query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    values?: I,
  ): Promise<QueryResult<R>> {
    return this.pool.query(queryTextOrConfig, values);
  }
}

export class StubbedPoolWrapper<T> implements PoolWrapper {
  constructor(private readonly expect?: T) {}
  query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    values?: I,
  ): Promise<QueryResult<R>> {
    return new Promise((resolve) => {
      const queryResult: QueryResult = {
        command: `${queryTextOrConfig} - ${values}`,
        fields: [],
        oid: 0,
        rowCount: 0,
        rows: this.expect ? [{ ...this.expect }] : [],
      };
      return resolve(queryResult);
    });
  }
}
