import { Pool } from 'pg';

interface BuildingDensity {
  buildings_50m: number | null;
}

const buildings50m: string = 'buildings_50m';

export class Buildings50mService {
  constructor(private readonly database: Pool) {}

  async getBuildings50mByCoordinateLocation(lat: number, lon: number): Promise<BuildingDensity> {
    const point = `ST_GeomFromText('POINT(${lon} ${lat})', 4326)::geography`;
    const query = `
    SELECT count(*)::integer as ${buildings50m}
    FROM batiment 
    WHERE ("usage_1"='Résidentiel' OR "usage_1"='Indifférencié') 
    AND ST_DWithin(${point},geometrie::geography,50);
    `;
    const { rows } = await this.database.query<BuildingDensity>(query);

    if (!rows[0]) {
      return { buildings_50m: null };
    }

    return rows[0];
  }
}