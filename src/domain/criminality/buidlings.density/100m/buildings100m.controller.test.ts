import { Request } from '@hapi/hapi';

import { responseToolkitForTest } from '../../../../libs/http';
import { Buildings100mController } from './buildings100m.controller';
import { Buildings100mService } from './buildings100m.service';

describe('Buildings100mController', () => {
  it('should return buildings density with 100m around coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    const buildings100mService = Buildings100mService.createStubWith({
      buildings_100m: 73,
    });
    const buildings100mController = new Buildings100mController(buildings100mService);
    const request = { params: { lat, lon } };
    // When
    const { statusCode, source } =
      await buildings100mController.getBuildings100mByCoordinateLocation(
        request as unknown as Request,
        responseToolkitForTest,
      );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      buildings_100m: 73,
    });
  });

  it('should throw an error with incorrect coordinate location', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    const buildings100mService = Buildings100mService.createStubWith();
    const buildings100mController = new Buildings100mController(buildings100mService);
    const request = { params: { lat, lon } };
    // When
    const promise = buildings100mController.getBuildings100mByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );
    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
