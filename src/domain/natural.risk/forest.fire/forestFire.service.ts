import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface ForestFire {
  gaspar_feu_foret: boolean | null;
}

const forestFire: string = 'gaspar_feu_foret';

export class ForestFireService {
  constructor(private readonly database: PoolWrapper) {}

  async getForestFireByCodeInsee(codeInsee: string): Promise<ForestFire> {
    const query = `
    SELECT exposed_to_forest_fire::boolean as ${forestFire}
    FROM gaspar_forest_fire
    WHERE code_insee = $1::text;
    `;

    const { rows } = await this.database.query<ForestFire>(query, [codeInsee]);

    if (!rows[0]) {
      return { gaspar_feu_foret: null };
    }

    return rows[0];
  }

  static create() {
    return new ForestFireService(poolWrapper);
  }

  static createStubWith(forestFire?: ForestFire) {
    return new ForestFireService(new StubbedPoolWrapper<ForestFire>(forestFire));
  }
}
