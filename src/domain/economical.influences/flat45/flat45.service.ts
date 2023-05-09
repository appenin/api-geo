import { poolWrapper } from '../../../config/database';
import { PoolWrapper, StubbedPoolWrapper } from '../../../libs/pool-wrapper';

interface FlatBuiltBefore1945 {
  insee_proportion_residence_principale_appart_avant_1945: number | null;
}

const flat45: string = 'insee_proportion_residence_principale_appart_avant_1945';

export class Flat45Service {
  constructor(private readonly database: PoolWrapper) {}

  async getFlat45ByCoordinateLocation(lat: number, lon: number): Promise<FlatBuiltBefore1945> {
    const point = `ST_GeomFromText('POINT(${lon} ${lat})', 4326)::geometry`;
    const query = `
    (
      SELECT part_of_flat_built_before_1945::float as ${flat45}
      FROM main_flat_residence_before_1945
      WHERE ST_Contains(geom::geometry, ${point})
      union select 0 as ${flat45}
    ) order by ${flat45} desc limit 1;`;

    const { rows } = await this.database.query<FlatBuiltBefore1945>(query);

    if (!rows[0]) {
      return { insee_proportion_residence_principale_appart_avant_1945: null };
    }

    return rows[0];
  }

  static create() {
    return new Flat45Service(poolWrapper);
  }

  static createStubWith(flatBuiltBefore1945?: FlatBuiltBefore1945) {
    return new Flat45Service(new StubbedPoolWrapper<FlatBuiltBefore1945>(flatBuiltBefore1945));
  }
}
