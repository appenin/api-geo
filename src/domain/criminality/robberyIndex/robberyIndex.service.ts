import { poolWrapper } from '../../../config/database';
import { transformDistrictCodeToCommuneCode } from '../../../helpers/requestDistricts';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface Robbery {
  taux_crime_delit_commune_cambriolage_pour_mille: number | null;
}

const robberyIndex: string = 'taux_crime_delit_commune_cambriolage_pour_mille';

export class RobberyIndexService {
  constructor(private readonly database: PoolWrapper) {}

  async getRobberyIndexByCodeInsee(codeInsee: string): Promise<Robbery> {
    const codeInseeFromDistrict = transformDistrictCodeToCommuneCode(codeInsee);
    const query = `
    (
      SELECT crime_index_per_thousand_inhabitant::FLOAT as ${robberyIndex}
      FROM crime_index_computed_2022
      WHERE code_insee = $1::text union select 0
    ) order by ${robberyIndex} desc limit 1;
    `;
    const { rows } = await this.database.query<Robbery>(query, [codeInseeFromDistrict]);

    if (!rows[0]) {
      return { taux_crime_delit_commune_cambriolage_pour_mille: null };
    }

    return rows[0];
  }

  static create() {
    return new RobberyIndexService(poolWrapper);
  }

  static createStubWith(robbery?: Robbery) {
    return new RobberyIndexService(new StubbedPoolWrapper<Robbery>(robbery));
  }
}
