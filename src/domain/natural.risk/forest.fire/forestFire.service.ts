import { Pool } from 'pg';

interface ForestFire {
  gaspar_feu_foret: boolean | null;
}

const forestFire: string = 'gaspar_feu_foret';

export class ForestFireService {
  constructor(private readonly database: Pool) {}

  async getForestFireByCodeInsee(codeInsee: string): Promise<ForestFire> {
    const query = `
    SELECT exposed_to_forest_fire::boolean as ${forestFire}
    FROM gaspar_forest_fire 
    WHERE code_insee = '${codeInsee}';
    `;

    const { rows } = await this.database.query<ForestFire>(query);

    if (!rows[0]) {
      return { gaspar_feu_foret: null };
    }

    return rows[0];
  }
}
