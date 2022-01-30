import { Pool } from 'pg';

interface BuildingHeight {
  ign_hauteur_batiment: number | null;
}

const buildingsHeight: string = 'ign_hauteur_batiment';

export class BuildingHeightService {
  constructor(private readonly database: Pool) {}

  async getBuildingHeightFromIDAddress(IDAddress: string): Promise<BuildingHeight> {
    const query = `
    SELECT batiment_groupe_bdtopo_bat.hauteur_mean as ${buildingsHeight}
    FROM bdnb_v072_open_data.rel_batiment_groupe_adresse
    LEFT JOIN bdnb_v072_open_data.batiment_groupe_bdtopo_bat
    ON rel_batiment_groupe_adresse.batiment_groupe_id = batiment_groupe_bdtopo_bat.batiment_groupe_id
    WHERE rel_batiment_groupe_adresse.cle_interop_adr = '${IDAddress}'
    LIMIT 1;
    `;
    const { rows } = await this.database.query<BuildingHeight>(query);

    if (!rows[0]) {
      return { ign_hauteur_batiment: null };
    }

    return rows[0];
  }
}
