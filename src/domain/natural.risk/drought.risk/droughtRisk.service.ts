import { Pool } from 'pg';

interface DroughtRisk {
  drought_risk: number | null;
}

const droughtRisk: string = 'drought_risk';

export class DroughtRiskService {
  constructor(private readonly database: Pool) {}

  async getDroughtRiskByCoordinateLocation(lat: number, lon: number): Promise<DroughtRisk> {
    const point = `ST_GeomFromText('POINT(${lon} ${lat})', 4326)`;
    const query = `
    (
      SELECT level::integer AS ${droughtRisk}
      FROM risk_rga 
      WHERE ST_Contains(geom, ${point}) union select 0 as ${droughtRisk}
    ) order by ${droughtRisk} desc limit 1;
    `;
    const { rows } = await this.database.query<DroughtRisk>(query);

    if (!rows[0]) {
      return { drought_risk: null };
    }

    return rows[0];
  }
}
