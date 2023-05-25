import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface DroughtRisk {
  drought_risk: number | null;
}

const droughtRisk: string = 'drought_risk';

export class DroughtRiskService {
  constructor(private readonly database: PoolWrapper) {}

  async getDroughtRiskByCoordinateLocation(lat: number, lon: number): Promise<DroughtRisk> {
    const point = `POINT(${lon} ${lat})`;
    const query = `
    (
      SELECT level::integer AS ${droughtRisk}
      FROM risk_rga
      WHERE ST_Contains(geom, ST_GeomFromText($1::text, 4326)) union select 0 as ${droughtRisk}
    ) order by ${droughtRisk} desc limit 1;
    `;
    const { rows } = await this.database.query<DroughtRisk>(query, [point]);

    if (!rows[0]) {
      return { drought_risk: null };
    }

    return rows[0];
  }

  static create() {
    return new DroughtRiskService(poolWrapper);
  }

  static createStubWith(droughtRisk?: DroughtRisk) {
    return new DroughtRiskService(new StubbedPoolWrapper<DroughtRisk>(droughtRisk));
  }
}
