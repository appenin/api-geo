import { poolWrapper } from '../../../config/database';
import { transformDistrictCodeToCommuneCode } from '../../../helpers/requestDistricts';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface Epci {
  code_epci: string | null;
  lib_epci: string | null;
}

const codeRegion: string = 'code_epci';
const libRegion: string = 'lib_epci';

export class EpciService {
  constructor(private readonly database: PoolWrapper) {}

  async getEpciByCodeInsee(codeInsee: string): Promise<Epci> {
    const codeInseeFromDistrict = transformDistrictCodeToCommuneCode(codeInsee);
    const query = `
    SELECT
        admin_epci_2022.code_epci as ${codeRegion},
        admin_epci_2022.lib_epci as ${libRegion}
    FROM admin_epci_2022
    LEFT JOIN epci_2022
        ON admin_epci_2022.code_epci = epci_2022.epci
    WHERE epci_2022.codgeo = $1::text
    LIMIT 1;
    `;

    const { rows } = await this.database.query<Epci>(query, [codeInseeFromDistrict]);

    if (!rows[0]) {
      return { code_epci: null, lib_epci: null };
    }

    return rows[0];
  }

  static create() {
    return new EpciService(poolWrapper);
  }

  static createStubWith(epci?: Epci) {
    return new EpciService(new StubbedPoolWrapper<Epci>(epci));
  }
}
