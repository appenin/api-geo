import { Pool } from 'pg';

import { transformDistrictCodeToCommuneCode } from '../../../helpers/requestDistricts';

interface ClimaticRegion {
  code_region_climatique: number | null;
  type_region_climatique: string | null;
}

const code: string = 'code_region_climatique';
const type: string = 'type_region_climatique';

export class ClimaticRegionService {
  constructor(private readonly database: Pool) {}

  async getClimateByCodeInsee(codeInsee: string): Promise<ClimaticRegion> {
    const codeInseeFromDistrict = transformDistrictCodeToCommuneCode(codeInsee);
    const query = `
    SELECT type as ${code}, category as ${type}
    FROM climate_by_muncipality 
    WHERE code_insee = '${codeInseeFromDistrict}';
    `;

    const { rows } = await this.database.query<ClimaticRegion>(query);

    if (!rows[0]) {
      return { code_region_climatique: null, type_region_climatique: null };
    }

    return rows[0];
  }
}
