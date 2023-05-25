import { poolWrapper } from '../../../config/database';
import { transformDistrictCodeToCommuneCode } from '../../../helpers/requestDistricts';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface ClimaticRegion {
  code_region_climatique: number | null;
  type_region_climatique: string | null;
}

const code: string = 'code_region_climatique';
const type: string = 'type_region_climatique';

export class ClimaticRegionService {
  constructor(private readonly database: PoolWrapper) {}

  async getClimateByCodeInsee(codeInsee: string): Promise<ClimaticRegion> {
    const codeInseeFromDistrict = transformDistrictCodeToCommuneCode(codeInsee);
    const query = `
    SELECT type as ${code}, category as ${type}
    FROM climate_by_muncipality
    WHERE code_insee = $1::text;
    `;

    const { rows } = await this.database.query<ClimaticRegion>(query, [codeInseeFromDistrict]);

    if (!rows[0]) {
      return { code_region_climatique: null, type_region_climatique: null };
    }

    return rows[0];
  }

  static create() {
    return new ClimaticRegionService(poolWrapper);
  }

  static createStubWith(climaticRegion?: ClimaticRegion) {
    return new ClimaticRegionService(new StubbedPoolWrapper<ClimaticRegion>(climaticRegion));
  }
}
