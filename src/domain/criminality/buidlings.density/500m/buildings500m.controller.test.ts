import { Request } from '@hapi/hapi';

import { responseToolkitForTest } from '../../../../libs/http';
import { Buildings500mController } from './buildings500m.controller';
import { Buildings500mService } from './buildings500m.service';

describe('Buildings500mController', () => {
  it('should return buildings density with 500m around coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    const buildings500mService = Buildings500mService.createStubWith({
      buildings_500m: 73,
    });
    const buildings500mController = new Buildings500mController(buildings500mService);
    const request = { params: { lat, lon } };
    // When
    const { statusCode, source } =
      await buildings500mController.getBuildings500mByCoordinateLocation(
        request as unknown as Request,
        responseToolkitForTest,
      );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      buildings_500m: 73,
    });
  });

  it('', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    const buildings500mService = Buildings500mService.createStubWith();
    const buildings500mController = new Buildings500mController(buildings500mService);
    const request = { params: { lat, lon } };
    // When
    const promise = buildings500mController.getBuildings500mByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );
    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
