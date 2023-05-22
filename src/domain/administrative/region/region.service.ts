import { poolWrapper } from '../../../config/database';
import { transformDistrictCodeToCommuneCode } from '../../../helpers/requestDistricts';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface Region {
  code_region: string | null;
  lib_region: string | null;
}

const codeRegion: string = 'code_region';
const libRegion: string = 'lib_region';

export class RegionService {
  constructor(private readonly database: PoolWrapper) {}

  async getRegionByCodeInsee(codeInsee: string): Promise<Region> {
    const codeInseeFromDistrict = transformDistrictCodeToCommuneCode(codeInsee);
    const query = `
    SELECT
      admin_region_2022.code_region as ${codeRegion},
      admin_region_2022.lib_region as ${libRegion}
    FROM admin_region_2022
    LEFT JOIN epci_2022
      ON admin_region_2022.code_region = epci_2022.reg
    WHERE epci_2022.codgeo = $1::text
    LIMIT 1;
    `;

    const { rows } = await this.database.query<Region>(query, [codeInseeFromDistrict]);

    if (!rows[0]) {
      return { code_region: null, lib_region: null };
    }

    return rows[0];
  }

  static create() {
    return new RegionService(poolWrapper);
  }

  static createStubWith(region?: Region) {
    return new RegionService(new StubbedPoolWrapper<Region>(region));
  }
}
