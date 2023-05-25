import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';
import { poolWrapper } from '../../../config/database';

export interface InseeAndIris {
  codeInsee: string | null;
  codeIris: string | null;
  municipalityName: string | null;
  irisName: string | null;
}

export class InseeAndIrisService {
  constructor(private readonly database: PoolWrapper) {}

  async getInseeAndIrisByCoordinateLocation(lat: number, lon: number): Promise<InseeAndIris> {
    const point = `POINT(${lon} ${lat})`;
    const query = `
    SELECT SUBSTRING(code_iris, 1, 5) AS code_insee,     code_iris, nom_com, nom_iris
    FROM iris_ge
    WHERE ST_Contains(geom, ST_GeomFromText($1::text, 4326))
    `;
    const { rows } = await this.database.query<InseeAndIris>(query, [point]);

    if (!rows[0]) {
      return { codeInsee: null, codeIris: null, municipalityName: null, irisName: null };
    }

    return rows[0];
  }

  static create() {
    return new InseeAndIrisService(poolWrapper);
  }

  static createStubWith(inseeAndIris?: InseeAndIris) {
    return new InseeAndIrisService(new StubbedPoolWrapper<InseeAndIris>(inseeAndIris));
  }
}
