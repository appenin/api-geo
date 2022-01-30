import { Pool } from 'pg';

interface HeatingSystem {
  ademe_logement_type_intallation_chauffage: string | null;
}

const heatingSystem: string = 'ademe_logement_type_intallation_chauffage';

export class HeatingSystemService {
  constructor(private readonly database: Pool) {}

  async getHeatingSystemFromIDAddress(IDAddress: string): Promise<HeatingSystem> {
    const query = `
        SELECT batiment_groupe_dpe_logtype.ch_type_inst as ${heatingSystem}
        FROM bdnb_v072_open_data.rel_batiment_groupe_adresse
        LEFT JOIN bdnb_v072_open_data.batiment_groupe_dpe_logtype
        ON rel_batiment_groupe_adresse.batiment_groupe_id = batiment_groupe_dpe_logtype.batiment_groupe_id
        WHERE rel_batiment_groupe_adresse.cle_interop_adr = '${IDAddress}'
        LIMIT 1;
        `;

    const { rows } = await this.database.query<HeatingSystem>(query);

    if (!rows[0]) {
      return { ademe_logement_type_intallation_chauffage: null };
    }

    return rows[0];
  }
}