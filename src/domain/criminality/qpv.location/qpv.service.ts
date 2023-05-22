import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface Qpv {
  anct_qpv_presence: number | null;
}

const qpv: string = 'anct_qpv_presence';

export class QpvService {
  constructor(private readonly database: PoolWrapper) {}

  async getQpvByCoordinateLocation(lat: number, lon: number): Promise<Qpv> {
    const point = `POINT(${lon} ${lat})`;
    const query = `
    SELECT CASE WHEN EXISTS (
      SELECT 1
      FROM qpv_2018
      WHERE ST_Contains(geom::geometry, ST_GeomFromText($1::text, 4326)::geometry)
    ) THEN CAST(1 AS integer) ELSE CAST(0 AS integer) END as ${qpv};
    `;
    const { rows } = await this.database.query<Qpv>(query, [point]);

    if (!rows[0]) {
      return { anct_qpv_presence: null };
    }

    return rows[0];
  }

  static create() {
    return new QpvService(poolWrapper);
  }

  static createStubWith(qpv?: Qpv) {
    return new QpvService(new StubbedPoolWrapper<Qpv>(qpv));
  }
}
