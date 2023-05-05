import { poolWrapper } from '../../../config/database';
import { transformDistrictCodeToCommuneCode } from '../../../helpers/requestDistricts';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface Robbery {
  minterieur_indicateur_crime_delit_commune_cambriolage_taux_pour_mille: number | null;
}

const robberyIndex: string =
  'minterieur_indicateur_crime_delit_commune_cambriolage_taux_pour_mille';

export class RobberyIndexService {
  constructor(private readonly database: PoolWrapper) {}

  async getRobberyIndexByCodeInsee(codeInsee: string): Promise<Robbery> {
    const codeInseeFromDistrict = transformDistrictCodeToCommuneCode(codeInsee);
    const query = `
    (
      SELECT crime_index_per_thousand_inhabitant::FLOAT as ${robberyIndex}
      FROM crime_index_computed_2022
      WHERE code_insee = '${codeInseeFromDistrict}' union select 0
    ) order by ${robberyIndex} desc limit 1;
    `;
    const { rows } = await this.database.query<Robbery>(query);

    if (!rows[0]) {
      return { minterieur_indicateur_crime_delit_commune_cambriolage_taux_pour_mille: null };
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
