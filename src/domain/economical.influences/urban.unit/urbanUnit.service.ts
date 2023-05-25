import { poolWrapper } from '../../../config/database';
import { transformDistrictCodeToCommuneCode } from '../../../helpers/requestDistricts';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface UrbanUnit {
  insee_code_unite_urbaine_statut_urbain: number | null;
  insee_unite_urbaine_statut_urbain: string | null;
}

const codeUnit: string = 'insee_code_unite_urbaine_statut_urbain';
const libUnit: string = 'insee_unite_urbaine_statut_urbain';

export class UrbanUnitService {
  constructor(private readonly database: PoolWrapper) {}

  async getUrbanUnitByCodeInsee(codeInsee: string): Promise<UrbanUnit> {
    const codeInseeFromDistrict = transformDistrictCodeToCommuneCode(codeInsee);
    const query = `
        SELECT code_urban_unit as ${codeUnit}, lib_urban_unit as ${libUnit}
        FROM urban_unit
        WHERE code_insee = $1::text;
        `;

    const { rows } = await this.database.query<UrbanUnit>(query, [codeInseeFromDistrict]);

    if (!rows[0]) {
      return {
        insee_code_unite_urbaine_statut_urbain: null,
        insee_unite_urbaine_statut_urbain: null,
      };
    }

    return rows[0];
  }

  static create() {
    return new UrbanUnitService(poolWrapper);
  }

  static createStubWith(urbanUnit?: UrbanUnit) {
    return new UrbanUnitService(new StubbedPoolWrapper<UrbanUnit>(urbanUnit));
  }
}
