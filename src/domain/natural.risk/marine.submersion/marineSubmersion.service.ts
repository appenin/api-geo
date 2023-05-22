import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface SubmersionRisk {
  marine_submersion: number | null;
}

const submersion: string = 'marine_submersion';

export class SubmersionRiskService {
  constructor(private readonly database: PoolWrapper) {}

  async getSubmersionRiskByCoordinateLocation(lat: number, lon: number): Promise<SubmersionRisk> {
    const point = `POINT(${lon} ${lat})`;
    const query = `
    (
      SELECT intensity_level AS ${submersion}
      FROM flood.marine_submersion
      WHERE ST_Contains(geom, ST_GeomFromText($1::text, 4326)) union select 0 as intensity_level
    ) order by ${submersion} desc limit 1;
    `;

    const { rows } = await this.database.query<SubmersionRisk>(query, [point]);

    if (!rows[0]) {
      return { marine_submersion: null };
    }

    return rows[0];
  }

  static create() {
    return new SubmersionRiskService(poolWrapper);
  }

  static createStubWith(submersionRisk?: SubmersionRisk) {
    return new SubmersionRiskService(new StubbedPoolWrapper<SubmersionRisk>(submersionRisk));
  }
}
