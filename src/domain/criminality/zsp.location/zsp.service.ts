import { Pool } from 'pg';

interface Zsp {
  minterieur_zsp_presence: number | null;
}

const zsp: string = 'minterieur_zsp_presence';

export class ZspService {
  constructor(private readonly database: Pool) {}

  async getZspByCoordinateLocation(lat: number, lon: number): Promise<Zsp> {
    const point = `ST_GeomFromText('POINT(${lon} ${lat})', 4326)::geometry`;
    const query = `
    SELECT CASE WHEN EXISTS (
      SELECT 1 
      FROM repair_zsp 
      WHERE ST_Contains(geom::geometry, ${point})
    ) THEN CAST(1 AS integer) ELSE CAST(0 AS integer) END as ${zsp};
    `;
    const { rows } = await this.database.query<Zsp>(query);

    if (!rows[0]) {
      return { minterieur_zsp_presence: null };
    }

    return rows[0];
  }
}
