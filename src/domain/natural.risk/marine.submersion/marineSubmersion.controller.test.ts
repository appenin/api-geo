import { responseToolkitForTest } from '../../../libs/http';
import { SubmersionRiskController } from './marineSubmersion.controller';
import { SubmersionRiskService } from './marineSubmersion.service';

describe('SubmersionRiskController', () => {
  it('should find submersion risk for given coordinates', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;

    const submersionRiskService = SubmersionRiskService.createStubWith({
      marine_submersion: 0,
    });
    const submersionRiskController = new SubmersionRiskController(submersionRiskService);
    const request = { params: { lat, lon } };
    // When
    const { statusCode, source } =
      await submersionRiskController.getSubmersionRiskByCoordinateLocation(
        request as any,
        responseToolkitForTest,
      );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      marine_submersion: 0,
    });
  });
  it('should throw an error with invalid insee code', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    const submersionRiskService = SubmersionRiskService.createStubWith();
    const submersionRiskController = new SubmersionRiskController(submersionRiskService);
    const request = { params: { lat, lon } };

    // When
    const promise = submersionRiskController.getSubmersionRiskByCoordinateLocation(
      request as any,
      responseToolkitForTest,
    );

    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
