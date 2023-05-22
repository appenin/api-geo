import { PoolWrapper, StubbedPoolWrapper } from '../../../../libs/pool-wrapper';
import { poolWrapper } from '../../../../config/database';

interface BuildingDensity {
  buildings_200m: number | null;
}

const buildings200m = 'buildings_200m';

export class Buildings200mService {
  constructor(private readonly database: PoolWrapper) {}

  async getBuildings200mByCoordinateLocation(lat: number, lon: number): Promise<BuildingDensity> {
    const point = `POINT(${lon} ${lat})`;
    const query = `
    SELECT count(*)::integer as ${buildings200m}
    FROM batiment
    WHERE ("usage_1"='Résidentiel' OR "usage_1"='Indifférencié')
    AND ST_DWithin(ST_GeomFromText($1::text, 4326)::geography,geometrie::geography,200);
    `;
    const { rows } = await this.database.query<BuildingDensity>(query, [point]);

    if (!rows[0]) {
      return { buildings_200m: null };
    }

    return rows[0];
  }

  static create() {
    return new Buildings200mService(poolWrapper);
  }

  static createStubWith(buildingDensity?: BuildingDensity) {
    return new Buildings200mService(new StubbedPoolWrapper<BuildingDensity>(buildingDensity));
  }
}
