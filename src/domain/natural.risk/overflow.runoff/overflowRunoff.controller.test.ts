import { responseToolkitForTest } from '../../../libs/http';
import { OverflowRunoffRiskController } from './overflowRunoff.controller';
import { OverflowRunoffRiskService } from './overflowRunoff.service';

describe('OverflowRunoffRiskService', () => {
  it('should find overflow risk for given coordinates', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;

    const overflowRunoffRiskService = OverflowRunoffRiskService.createStubWith({
      overflow_runoff: 0,
    });
    const overflowRunoffRiskController = new OverflowRunoffRiskController(
      overflowRunoffRiskService,
    );
    const request = { params: { lat, lon } };
    // When
    const { statusCode, source } =
      await overflowRunoffRiskController.getOverflowRunoffRiskByCoordinateLocation(
        request as any,
        responseToolkitForTest,
      );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      overflow_runoff: 0,
    });
  });
  it('should throw an error with invalid coordinates', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    const overflowRunoffRiskService = OverflowRunoffRiskService.createStubWith();
    const overflowRunoffRiskController = new OverflowRunoffRiskController(
      overflowRunoffRiskService,
    );
    const request = { params: { lat, lon } };

    // When
    const promise = overflowRunoffRiskController.getOverflowRunoffRiskByCoordinateLocation(
      request as any,
      responseToolkitForTest,
    );

    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
