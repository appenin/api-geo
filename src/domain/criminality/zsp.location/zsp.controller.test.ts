import { Request } from '@hapi/hapi';

import { responseToolkitForTest } from '../../../libs/http';
import { ZspController } from './zsp.controller';
import { ZspService } from './zsp.service';

describe('ZspController', () => {
  it('should return zsp value with coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    const zspService = ZspService.createStubWith({
      minterieur_zsp_presence: 0,
    });
    const zspController = new ZspController(zspService);
    const request = { params: { lat, lon } };
    // When
    const { statusCode, source } = await zspController.getZspByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      minterieur_zsp_presence: 0,
    });
  });

  it('should throw an error with incorrect coordinate location', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    const zspService = ZspService.createStubWith();
    const zspController = new ZspController(zspService);
    const request = { params: { lat, lon } };
    // When
    const promise = zspController.getZspByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );
    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
