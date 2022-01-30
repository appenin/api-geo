import { Pool } from 'pg';

interface Qpv {
  anct_qpv_presence: number | null;
}

const qpv: string = 'anct_qpv_presence';

export class QpvService {
  constructor(private readonly database: Pool) {}

  async getQpvByCoordinateLocation(lat: number, lon: number): Promise<Qpv> {
    const point = `ST_GeomFromText('POINT(${lon} ${lat})', 4326)::geometry`;
    const query = `
    SELECT CASE WHEN EXISTS (
      SELECT 1 
      FROM qpv_2018 
      WHERE ST_Contains(geom::geometry, ${point})
    ) THEN CAST(1 AS integer) ELSE CAST(0 AS integer) END as ${qpv};
    `;
    const { rows } = await this.database.query<Qpv>(query);

    if (!rows[0]) {
      return { anct_qpv_presence: null };
    }

    return rows[0];
  }
}
