import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface YearOfConstruction {
  ffo_annee_construction: string | null;
}

const yearOfConstruction: string = 'ffo_annee_construction';

export class YearOfConstructionService {
  constructor(private readonly database: PoolWrapper) {}

  async getYearOfConstructionFromIDAddress(idAddress: string): Promise<YearOfConstruction> {
    const query = `
        SELECT batiment_groupe_ffo_bat.annee_construction as ${yearOfConstruction}
        FROM bdnb_v072_open_data.rel_batiment_groupe_adresse
        LEFT JOIN bdnb_v072_open_data.batiment_groupe_ffo_bat
        ON rel_batiment_groupe_adresse.batiment_groupe_id = batiment_groupe_ffo_bat.batiment_groupe_id
        WHERE rel_batiment_groupe_adresse.cle_interop_adr = $1::text
        LIMIT 1;
        `;

    const { rows } = await this.database.query<YearOfConstruction>(query, [idAddress]);

    if (!rows[0]) {
      return { ffo_annee_construction: null };
    }

    return rows[0];
  }

  static create() {
    return new YearOfConstructionService(poolWrapper);
  }

  static createStubWith(result: YearOfConstruction) {
    return new YearOfConstructionService(new StubbedPoolWrapper<YearOfConstruction>(result));
  }
}
