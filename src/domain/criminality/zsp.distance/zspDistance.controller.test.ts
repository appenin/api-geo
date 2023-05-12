import { Request } from '@hapi/hapi';

import { responseToolkitForTest } from '../../../libs/http';
import { ZspDistanceController } from './zspDistance.controller';
import { ZspDistanceService } from './zspDistance.service';

describe('ZspDistanceController', () => {
  it('should return zsp distance value with coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    const zspDistanceService = ZspDistanceService.createStubWith({
      minterieur_zsp_distance: 4.583,
    });
    const zspDistanceController = new ZspDistanceController(zspDistanceService);
    const request = { params: { lat, lon } };
    // When
    const { statusCode, source } = await zspDistanceController.getZspDistanceByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      minterieur_zsp_distance: 4.583,
    });
  });

  it('should throw an error with incorrect coordinate location', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    const zspDistanceService = ZspDistanceService.createStubWith();
    const zspDistanceController = new ZspDistanceController(zspDistanceService);
    const request = { params: { lat, lon } };
    // When
    const promise = zspDistanceController.getZspDistanceByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );
    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
