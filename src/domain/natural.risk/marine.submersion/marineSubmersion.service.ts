import { Pool } from 'pg';

interface SubmersionRisk {
  marine_submersion: number | null;
}

const submersion: string = 'marine_submersion';

export class SubmersionRiskService {
  constructor(private readonly database: Pool) {}

  async getSubmersionRiskByCoordinateLocation(lat: number, lon: number): Promise<SubmersionRisk> {
    const point = `ST_GeomFromText('POINT(${lon} ${lat})', 4326)`;
    const query = `
    (
      SELECT intensity_level AS ${submersion}
      FROM flood.marine_submersion 
      WHERE ST_Contains(geom, ${point}) union select 0 as intensity_level
    ) order by ${submersion} desc limit 1;
    `;

    const { rows } = await this.database.query<SubmersionRisk>(query);

    if (!rows[0]) {
      return { marine_submersion: null };
    }

    return rows[0];
  }
}
