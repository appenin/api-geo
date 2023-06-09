import { poolWrapper } from '../../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../../libs/pool-wrapper';

interface BuildingDensity {
  buildings_500m: number | null;
}

const buildings500m: string = 'buildings_500m';

export class Buildings500mService {
  constructor(private readonly database: PoolWrapper) {}

  async getBuildings500mByCoordinateLocation(lat: number, lon: number): Promise<BuildingDensity> {
    const point = `POINT(${lon} ${lat})`;
    const query = `
    SELECT count(*)::integer as ${buildings500m}
    FROM batiment
    WHERE ("usage_1"='Résidentiel' OR "usage_1"='Indifférencié')
      AND ST_DWithin(ST_GeomFromText($1::text, 4326)::geography,geometrie::geography,500);
    `;
    const { rows } = await this.database.query<BuildingDensity>(query, [point]);

    if (!rows[0]) {
      return { buildings_500m: null };
    }

    return rows[0];
  }

  static create() {
    return new Buildings500mService(poolWrapper);
  }

  static createStubWith(buildingDensity?: BuildingDensity) {
    return new Buildings500mService(new StubbedPoolWrapper<BuildingDensity>(buildingDensity));
  }
}
