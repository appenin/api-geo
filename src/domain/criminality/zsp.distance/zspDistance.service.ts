import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface ZspDistance {
  minterieur_zsp_distance: number | null;
}

const zspDistance: string = 'minterieur_zsp_distance';

export class ZspDistanceService {
  constructor(private readonly database: PoolWrapper) {}

  async getZspDistanceByCoordinateLocation(lat: number, lon: number): Promise<ZspDistance> {
    const point = `POINT(${lon} ${lat})`;
    const query = `
      SELECT
        ROUND(
          (ST_Distance(ST_Transform(ST_GeomFromText($1::text, 4326)::geometry, 2154), ST_Transform(a.geom, 2154))::NUMERIC/1000), 3
        )::FLOAT as ${zspDistance}
      FROM
        repair_zsp a
      ORDER BY ST_Transform(ST_GeomFromText($1::text, 4326)::geometry, 2154) <-> ST_Transform(a.geom, 2154)
      LIMIT 1;
    `;
    const { rows } = await this.database.query<ZspDistance>(query, [point]);

    if (!rows[0]) {
      return { minterieur_zsp_distance: null };
    }

    return rows[0];
  }

  static create() {
    return new ZspDistanceService(poolWrapper);
  }

  static createStubWith(zspDistance?: ZspDistance) {
    return new ZspDistanceService(new StubbedPoolWrapper<ZspDistance>(zspDistance));
  }
}
