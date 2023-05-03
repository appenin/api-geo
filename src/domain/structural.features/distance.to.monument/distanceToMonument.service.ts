import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface DistanceToMonument {
  merime_distance_monument_historique_500min: number | null;
}

const distanceToMonument: string = 'merime_distance_monument_historique_500min';

export class DistanceToMonumentService {
  constructor(private readonly database: PoolWrapper) {}

  async getDistanceToMonumentFromIDAddress(IDAddress: string): Promise<DistanceToMonument> {
    const query = `
        SELECT batiment_groupe_merimee.distance_batiment_historique_plus_proche as ${distanceToMonument}
        FROM bdnb_v072_open_data.rel_batiment_groupe_adresse
        LEFT JOIN bdnb_v072_open_data.batiment_groupe_merimee
        ON rel_batiment_groupe_adresse.batiment_groupe_id = batiment_groupe_merimee.batiment_groupe_id
        WHERE rel_batiment_groupe_adresse.cle_interop_adr = '${IDAddress}'
        LIMIT 1;
        `;

    const { rows } = await this.database.query<DistanceToMonument>(query);

    if (!rows[0]) {
      return { merime_distance_monument_historique_500min: null };
    }

    return rows[0];
  }

  static create() {
    return new DistanceToMonumentService(poolWrapper);
  }

  static createStubWith(distanceToMonument?: DistanceToMonument) {
    return new DistanceToMonumentService(
      new StubbedPoolWrapper<DistanceToMonument>(distanceToMonument),
    );
  }
}
