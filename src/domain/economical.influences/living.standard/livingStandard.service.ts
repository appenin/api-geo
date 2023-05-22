import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';
import { poolWrapper } from '../../../config/database';

interface LivingStandard {
  insee_filosofi_niveaux_de_vie_moyen: number | null;
}

const livingStandard: string = 'insee_filosofi_niveaux_de_vie_moyen';

export class LivingStandardService {
  constructor(private readonly database: PoolWrapper) {}

  async getLivingStandardByCoordinateLocation(lat: number, lon: number): Promise<LivingStandard> {
    const point = `POINT(${lon} ${lat})`;
    const query = `
    (
      SELECT ROUND(niveaux_de_vie_moyen, 2)::float AS ${livingStandard}
      FROM tiles_filosofi_appenin
      WHERE ST_Contains(geom::geometry, ST_GeomFromText($1::text, 4326)::geometry)
      union select 0 as ${livingStandard}
    ) order by ${livingStandard} desc
    limit 1;
    `;
    const { rows } = await this.database.query<LivingStandard>(query, [point]);

    if (!rows[0]) {
      return { insee_filosofi_niveaux_de_vie_moyen: null };
    }

    return rows[0];
  }

  static create() {
    return new LivingStandardService(poolWrapper);
  }

  static createStubWith(livingStandard?: LivingStandard) {
    return new LivingStandardService(new StubbedPoolWrapper<LivingStandard>(livingStandard));
  }
}
