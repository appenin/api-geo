import { Request } from '@hapi/hapi';

import { responseToolkitForTest } from '../../../libs/http';
import { QpvController } from './qpv.controller';
import { QpvService } from './qpv.service';

describe('QpvController', () => {
  it('should return priority district value with coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    const qpvService = QpvService.createStubWith({
      anct_qpv_presence: 0,
    });
    const qpvController = new QpvController(qpvService);
    const request = { params: { lat, lon } };
    // When
    const { statusCode, source } = await qpvController.getQpvByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      anct_qpv_presence: 0,
    });
  });

  it('should throw an error with incorrect coordinate location', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    const qpvService = QpvService.createStubWith();
    const qpvController = new QpvController(qpvService);
    const request = { params: { lat, lon } };
    // When
    const promise = qpvController.getQpvByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );
    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
