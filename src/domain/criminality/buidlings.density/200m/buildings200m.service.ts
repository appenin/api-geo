import { Pool } from 'pg';

interface BuildingDensity {
  buildings_200m: number | null;
}

const buildings200m = 'buildings_200m';

export class Buildings200mService {
  constructor(private readonly database: Pool) {}

  async getBuildings200mByCoordinateLocation(lat: number, lon: number): Promise<BuildingDensity> {
    const point = `ST_GeomFromText('POINT(${lon} ${lat})', 4326)::geography`;
    const query = `
    SELECT count(*)::integer as ${buildings200m} 
    FROM batiment 
    WHERE ("usage_1"='Résidentiel' OR "usage_1"='Indifférencié') 
    AND ST_DWithin(${point},geometrie::geography,200);
    `;
    const { rows } = await this.database.query<BuildingDensity>(query);

    if (!rows[0]) {
      return { buildings_200m: null };
    }

    return rows[0];
  }
}
