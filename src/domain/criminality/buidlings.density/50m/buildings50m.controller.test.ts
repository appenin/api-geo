import { Request } from '@hapi/hapi';

import { responseToolkitForTest } from '../../../../libs/http';
import { Buildings50mController } from './buildings50m.controller';
import { Buildings50mService } from './buildings50m.service';

describe('Buildings50mController', () => {
  it('should return buildings density with 50m around coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    const buildings50mService = Buildings50mService.createStubWith({
      buildings_50m: 73,
    });
    const buildings50mController = new Buildings50mController(buildings50mService);
    const request = { params: { lat, lon } };
    // When
    const { statusCode, source } = await buildings50mController.getBuildings50mByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      buildings_50m: 73,
    });
  });

  it('should throw an error with incorrect coordinate location', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    const buildings50mService = Buildings50mService.createStubWith();
    const buildings50mController = new Buildings50mController(buildings50mService);
    const request = { params: { lat, lon } };
    // When
    const promise = buildings50mController.getBuildings50mByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );
    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
