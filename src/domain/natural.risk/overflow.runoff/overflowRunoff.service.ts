import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface OverflowRunoffRisk {
  overflow_runoff: number | null;
}

const overflowRunoff: string = 'overflow_runoff';

export class OverflowRunoffRiskService {
  constructor(private readonly database: PoolWrapper) {}

  async getOverflowRunoffRiskByCoordinateLocation(
    lat: number,
    lon: number,
  ): Promise<OverflowRunoffRisk> {
    const point = `POINT(${lon} ${lat})`;
    const query = `
    (
      SELECT intensity_level AS ${overflowRunoff}
      FROM flood.overflow_runoff
      WHERE ST_Contains(geom, ST_GeomFromText($1::text, 4326)) union select 0 as intensity_level
    ) order by ${overflowRunoff} desc limit 1;
    `;

    const { rows } = await this.database.query<OverflowRunoffRisk>(query, [point]);

    if (!rows[0]) {
      return { overflow_runoff: null };
    }

    return rows[0];
  }

  static create() {
    return new OverflowRunoffRiskService(poolWrapper);
  }

  static createStubWith(overflowRunoffRisk?: OverflowRunoffRisk) {
    return new OverflowRunoffRiskService(
      new StubbedPoolWrapper<OverflowRunoffRisk>(overflowRunoffRisk),
    );
  }
}
