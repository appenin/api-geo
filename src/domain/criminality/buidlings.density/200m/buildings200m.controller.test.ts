import { Request } from '@hapi/hapi';

import { responseToolkitForTest } from '../../../../libs/http';
import { Buildings200mController } from './buildings200m.controller';
import { Buildings200mService } from './buildings200m.service';

describe('Buildings200mController', () => {
  it('should return buildings density with 200m around coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    const buildings200mService = Buildings200mService.createStubWith({
      buildings_200m: 73,
    });
    const buildings200mController = new Buildings200mController(buildings200mService);
    const request = { params: { lat, lon } };
    // When
    const { statusCode, source } =
      await buildings200mController.getBuildings200mByCoordinateLocation(
        request as unknown as Request,
        responseToolkitForTest,
      );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      buildings_200m: 73,
    });
  });

  it('', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    const buildings200mService = Buildings200mService.createStubWith();
    const buildings200mController = new Buildings200mController(buildings200mService);
    const request = { params: { lat, lon } };
    // When
    const promise = buildings200mController.getBuildings200mByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );
    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
