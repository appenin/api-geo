import { Pool } from 'pg';

import { transformDistrictCodeToCommuneCode } from '../../../helpers/requestDistricts';

interface Department {
  code_departement: string | null;
  lib_departement: string | null;
}

const codeRegion: string = 'code_departement';
const libRegion: string = 'lib_departement';

export class DepartementService {
  constructor(private readonly database: Pool) {}

  async getDepartmentByCodeInsee(codeInsee: string): Promise<Department> {
    const codeInseeFromDistrict = transformDistrictCodeToCommuneCode(codeInsee);
    const query = `
    SELECT 
        admin_departement_2022.code_departement as ${codeRegion},
        admin_departement_2022.lib_departement as ${libRegion}
    FROM admin_departement_2022
    LEFT JOIN epci_2022
        ON admin_departement_2022.code_departement = epci_2022.dep
    WHERE epci_2022.codgeo = '${codeInseeFromDistrict}'
    LIMIT 1;
    `;

    const { rows } = await this.database.query<Department>(query);

    if (!rows[0]) {
      return { code_departement: null, lib_departement: null };
    }

    return rows[0];
  }
}
