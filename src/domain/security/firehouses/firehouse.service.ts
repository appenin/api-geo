import { Pool } from 'pg';

interface Firehouse {
  dggn_nombre_caserne_pompiers_commune: number | null;
}

const firehouseCount: string = 'dggn_nombre_caserne_pompiers_commune';

export class FirehouseService {
  constructor(private readonly database: Pool) {}

  async getFirehousesByCodeInsee(codeInsee: string): Promise<Firehouse> {
    const query = `
          SELECT firehouses as ${firehouseCount}
          FROM firehouse_municipalties 
          WHERE insee_com = '${codeInsee}' 
          UNION SELECT 0 as firehouses
          ORDER BY ${firehouseCount} DESC
          LIMIT 1;
        `;

    const { rows } = await this.database.query<Firehouse>(query);

    if (!rows[0]) {
      return { dggn_nombre_caserne_pompiers_commune: null };
    }

    return rows[0];
  }
}
