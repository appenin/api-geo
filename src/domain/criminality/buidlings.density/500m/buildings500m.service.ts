import { Pool } from 'pg';

interface BuildingDensity {
  buildings_500m: number | null;
}

const buildings500m: string = 'buildings_500m';

export class Buildings500mService {
  constructor(private readonly database: Pool) {}

  async getBuildings500mByCoordinateLocation(lat: number, lon: number): Promise<BuildingDensity> {
    const point = `ST_GeomFromText('POINT(${lon} ${lat})', 4326)::geography`;
    const query = `
    SELECT count(*)::integer as ${buildings500m} 
    FROM batiment 
    WHERE ("usage_1"='Résidentiel' OR "usage_1"='Indifférencié') 
    AND ST_DWithin(${point},geometrie::geography,500);
    `;
    const { rows } = await this.database.query<BuildingDensity>(query);

    if (!rows[0]) {
      return { buildings_500m: null };
    }

    return rows[0];
  }
}
