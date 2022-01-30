import { Pool } from 'pg';

interface ZspDistance {
  minterieur_zsp_distance: number | null;
}

const zspDistance: string = 'minterieur_zsp_distance';

export class ZspDistanceService {
  constructor(private readonly database: Pool) {}

  async getZspDistanceByCoordinateLocation(lat: number, lon: number): Promise<ZspDistance> {
    const point = `ST_GeomFromText('POINT(${lon} ${lat})', 4326)::geometry`;
    const query = `
      SELECT
        ROUND(
          (ST_Distance(ST_Transform(${point}, 2154), ST_Transform(a.geom, 2154))::NUMERIC/1000), 3
        )::FLOAT as ${zspDistance}
      FROM 
        repair_zsp a
      ORDER BY ST_Transform(${point}, 2154) <-> ST_Transform(a.geom, 2154)
      LIMIT 1;
    `;
    const { rows } = await this.database.query<ZspDistance>(query);

    if (!rows[0]) {
      return { minterieur_zsp_distance: null };
    }

    return rows[0];
  }
}
