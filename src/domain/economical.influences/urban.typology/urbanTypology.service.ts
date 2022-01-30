import { Pool } from 'pg';

import { transformDistrictCodeToCommuneCode } from '../../../helpers/requestDistricts';

interface UrbanTypology {
  insee_code_unite_urbaine_typologie_urbaine: number | null;
  insee_unite_urbaine_typologie_urbaine: string | null;
}

const codeTypology: string = 'insee_code_unite_urbaine_typologie_urbaine';
const libTypology: string = 'insee_unite_urbaine_typologie_urbaine';

export class UrbanTypologyService {
  constructor(private readonly database: Pool) {}

  async getUrbanTypologyByCodeInsee(codeInsee: string): Promise<UrbanTypology> {
    const codeInseeFromDistrict = transformDistrictCodeToCommuneCode(codeInsee);
    const query = `
    SELECT code_urban_typology as ${codeTypology}, lib_urban_typology as ${libTypology}
    FROM urban_typology 
    WHERE code_insee = '${codeInseeFromDistrict}';
    `;

    const { rows } = await this.database.query<UrbanTypology>(query);

    if (!rows[0]) {
      return {
        insee_code_unite_urbaine_typologie_urbaine: null,
        insee_unite_urbaine_typologie_urbaine: null,
      };
    }

    return rows[0];
  }
}
