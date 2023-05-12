import { Request } from '@hapi/hapi';

import { responseToolkitForTest } from '../../../libs/http';
import { Flat45Controller } from './flat45.controller';
import { Flat45Service } from './flat45.service';

describe('Flat45Controller', () => {
  it('should find number of flat built before 1945 for a given coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;

    const flat45Service = Flat45Service.createStubWith({
      insee_proportion_residence_principale_appart_avant_1945: 1,
    });
    const flat45Controller = new Flat45Controller(flat45Service);

    const request = { params: { lat, lon } };

    // When
    const { statusCode, source } = await flat45Controller.getFlat45ByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      insee_proportion_residence_principale_appart_avant_1945: 1,
    });
  });

  it('should throw an error when an invalid coordinate location is given', async () => {
    // Given
    const flat45Service = Flat45Service.createStubWith();
    const lat = 0.0;
    const lon = 10.0;
    const flat45Controller = new Flat45Controller(flat45Service);
    const request = { params: { lat, lon } };

    // When
    const promise = flat45Controller.getFlat45ByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );

    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
