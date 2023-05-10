import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface HouseholdDensity {
  insee_filosofi_densite_menage_km2: number | null;
}

const householdDensity: string = 'insee_filosofi_densite_menage_km2';

export class HouseholdService {
  constructor(private readonly database: PoolWrapper) {}

  async getHouseholdByCoordinateLocation(lat: number, lon: number): Promise<HouseholdDensity> {
    const point = `ST_GeomFromText('POINT(${lon} ${lat})', 4326)::geometry`;
    const query = `
    (
      SELECT ROUND(densite_menage_km2, 2)::float AS ${householdDensity}
      FROM tiles_filosofi_appenin
      WHERE ST_Contains(geom::geometry, ${point})
      union select 0 as ${householdDensity}
    ) order by ${householdDensity} desc
    limit 1;
    `;

    const { rows } = await this.database.query<HouseholdDensity>(query);

    if (!rows[0]) {
      return { insee_filosofi_densite_menage_km2: null };
    }

    return rows[0];
  }

  static create() {
    return new HouseholdService(poolWrapper);
  }

  static createStubWith(householdDensity?: HouseholdDensity) {
    return new HouseholdService(new StubbedPoolWrapper(householdDensity));
  }
}
