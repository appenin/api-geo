import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface PresenceOfBalcony {
  ademe_logement_type_avancee_balcon_max: string | null;
}

const presenceOfBalcony: string = 'ademe_logement_type_avancee_balcon_max';

export class PresenceOfBalconyService {
  constructor(private readonly database: PoolWrapper) {}

  async getPresenceOfBalconyFromIDAddress(IDAddress: string): Promise<PresenceOfBalcony> {
    const query = `
    SELECT 
    (CASE 
      WHEN batiment_groupe_dpe_logtype.avancee_masque_max = '< 1 m' THEN 'BALCON'
      WHEN batiment_groupe_dpe_logtype.avancee_masque_max = '1 <= … < 2' THEN 'BALCON'
      WHEN batiment_groupe_dpe_logtype.avancee_masque_max = '3 <=' THEN 'BALCON'
      WHEN batiment_groupe_dpe_logtype.avancee_masque_max = '2 <= … < 3' THEN 'BALCON'
      ELSE 'PAS_BALCON' 
    END) as ${presenceOfBalcony}
    FROM bdnb_v072_open_data.rel_batiment_groupe_adresse
    LEFT JOIN bdnb_v072_open_data.batiment_groupe_dpe_logtype
    ON rel_batiment_groupe_adresse.batiment_groupe_id = batiment_groupe_dpe_logtype.batiment_groupe_id
    WHERE rel_batiment_groupe_adresse.cle_interop_adr = '${IDAddress}'
    LIMIT 1;
    `;

    const { rows } = await this.database.query<PresenceOfBalcony>(query);

    if (!rows[0]) {
      return { ademe_logement_type_avancee_balcon_max: null };
    }

    return rows[0];
  }

  static create() {
    return new PresenceOfBalconyService(poolWrapper);
  }

  static createStubWith(presenceOfBalcony?: PresenceOfBalcony) {
    return new PresenceOfBalconyService(
      new StubbedPoolWrapper<PresenceOfBalcony>(presenceOfBalcony),
    );
  }
}
