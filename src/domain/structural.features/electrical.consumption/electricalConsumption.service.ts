import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface ElectricalConsumption {
  ademe_consommation_electrique_residentiel_par_pdl: number | null;
}

const electricalConsumption: string = 'ademe_consommation_electrique_residentiel_par_pdl';

export class ElectricalConsumptionService {
  constructor(private readonly database: PoolWrapper) {}

  async getElectricalConsumptionFromIDAddress(IDAddress: string): Promise<ElectricalConsumption> {
    const query = `
    SELECT batiment_groupe_dle_elec_2020.conso_res_par_pdl::float as ${electricalConsumption}
    FROM bdnb_v072_open_data.rel_batiment_groupe_adresse
    LEFT JOIN bdnb_v072_open_data.batiment_groupe_dle_elec_2020
    ON rel_batiment_groupe_adresse.batiment_groupe_id = batiment_groupe_dle_elec_2020.batiment_groupe_id
    WHERE rel_batiment_groupe_adresse.cle_interop_adr = '${IDAddress}'
    LIMIT 1;
    `;

    const { rows } = await this.database.query<ElectricalConsumption>(query);

    if (!rows[0]) {
      return { ademe_consommation_electrique_residentiel_par_pdl: null };
    }

    return rows[0];
  }

  static create() {
    return new ElectricalConsumptionService(poolWrapper);
  }

  static createStubWith(electricalConsumption?: ElectricalConsumption) {
    return new ElectricalConsumptionService(
      new StubbedPoolWrapper<ElectricalConsumption>(electricalConsumption),
    );
  }
}
