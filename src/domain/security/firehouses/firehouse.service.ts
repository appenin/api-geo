import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface Firehouse {
  dggn_nombre_caserne_pompiers_commune: number | null;
}

const firehouseCount: string = 'dggn_nombre_caserne_pompiers_commune';

export class FirehouseService {
  constructor(private readonly database: PoolWrapper) {}

  async getFirehousesByCodeInsee(codeInsee: string): Promise<Firehouse> {
    const query = `
          SELECT firehouses as ${firehouseCount}
          FROM firehouse_municipalties
          WHERE insee_com = $1::text
          UNION SELECT 0 as firehouses
          ORDER BY ${firehouseCount} DESC
          LIMIT 1;
        `;

    const { rows } = await this.database.query<Firehouse>(query, [codeInsee]);

    if (!rows[0]) {
      return { dggn_nombre_caserne_pompiers_commune: null };
    }

    return rows[0];
  }

  static create() {
    return new FirehouseService(poolWrapper);
  }

  static createStubWith(firehouse?: Firehouse) {
    return new FirehouseService(new StubbedPoolWrapper<Firehouse>(firehouse));
  }
}
