import { Pool } from 'pg';

interface BuildingDensity {
  buildings_100m: number | null;
}

const buildings100m: string = 'buildings_100m';

export class Buildings100mService {
  constructor(private readonly database: Pool) {}

  async getBuildings100mByCoordinateLocation(lat: number, lon: number): Promise<BuildingDensity> {
    const point = `ST_GeomFromText('POINT(${lon} ${lat})', 4326)::geography`;
    const query = `
    SELECT count(*)::integer as ${buildings100m} 
    FROM batiment 
    WHERE ("usage_1"='Résidentiel' OR "usage_1"='Indifférencié') 
    AND ST_DWithin(${point},geometrie::geography,100);
    `;
    const { rows } = await this.database.query<BuildingDensity>(query);

    if (!rows[0]) {
      return { buildings_100m: null };
    }

    return rows[0];
  }
}
