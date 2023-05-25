import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface HouseholdDensity {
  insee_filosofi_densite_menage_km2: number | null;
}

const householdDensity: string = 'insee_filosofi_densite_menage_km2';

export class HouseholdService {
  constructor(private readonly database: PoolWrapper) {}

  async getHouseholdByCoordinateLocation(lat: number, lon: number): Promise<HouseholdDensity> {
    const point = `POINT(${lon} ${lat})`;
    const query = `
    (
      SELECT ROUND(densite_menage_km2, 2)::float AS ${householdDensity}
      FROM tiles_filosofi_appenin
      WHERE ST_Contains(geom::geometry, ST_GeomFromText($1::text, 4326)::geometry)
      union select 0 as ${householdDensity}
    ) order by ${householdDensity} desc
    limit 1;
    `;

    const { rows } = await this.database.query<HouseholdDensity>(query, [point]);

    if (!rows[0]) {
      return { insee_filosofi_densite_menage_km2: null };
    }

    return rows[0];
  }

  static create() {
    return new HouseholdService(poolWrapper);
  }

  static createStubWith(householdDensity?: HouseholdDensity) {
    return new HouseholdService(new StubbedPoolWrapper<HouseholdDensity>(householdDensity));
  }
}
