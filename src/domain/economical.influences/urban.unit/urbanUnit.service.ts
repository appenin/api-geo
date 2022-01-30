import { Pool } from 'pg';

import { transformDistrictCodeToCommuneCode } from '../../../helpers/requestDistricts';

interface UrbanUnit {
  insee_code_unite_urbaine_statut_urbain: number | null;
  insee_unite_urbaine_statut_urbain: string | null;
}

const codeUnit: string = 'insee_code_unite_urbaine_statut_urbain';
const libUnit: string = 'insee_unite_urbaine_statut_urbain';

export class UrbanUnitService {
  constructor(private readonly database: Pool) {}

  async getUrbanUnitByCodeInsee(codeInsee: string): Promise<UrbanUnit> {
    const codeInseeFromDistrict = transformDistrictCodeToCommuneCode(codeInsee);
    const query = `
        SELECT code_urban_unit as ${codeUnit}, lib_urban_unit as ${libUnit}
        FROM urban_unit 
        WHERE code_insee = '${codeInseeFromDistrict}';
        `;

    const { rows } = await this.database.query<UrbanUnit>(query);

    if (!rows[0]) {
      return {
        insee_code_unite_urbaine_statut_urbain: null,
        insee_unite_urbaine_statut_urbain: null,
      };
    }

    return rows[0];
  }
}
