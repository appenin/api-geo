
import { transformDistrictCodeToCommuneCode } from '../../../helpers/requestDistricts';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';
import { poolWrapper } from '../../../config/database';

interface Department {
  code_departement: string | null;
  lib_departement: string | null;
}

const codeRegion: string = 'code_departement';
const libRegion: string = 'lib_departement';

export class DepartementService {
  constructor(private readonly database: PoolWrapper) {}

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

  static create() {
    return new DepartementService(poolWrapper);
  }

  static createStubWith(department?: Department) {
    return new DepartementService(new StubbedPoolWrapper<Department>(department));
  }
}
