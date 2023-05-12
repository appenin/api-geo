import { responseToolkitForTest } from '../../../libs/http';
import { DroughtRiskController } from './droughtRisk.controller';
import { DroughtRiskService } from './droughtRisk.service';

describe('DroughtRiskController', () => {
  it('should find drought risk for given coordinates', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;

    const droughtRiskService = DroughtRiskService.createStubWith({
      drought_risk: 0,
    });
    const droughtRiskController = new DroughtRiskController(droughtRiskService);
    const request = { params: { lat, lon } };
    // When
    const { statusCode, source } = await droughtRiskController.getDroughtRiskByCoordinateLocation(
      request as any,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      drought_risk: 0,
    });
  });
  it('should throw an error with invalid insee code', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    const droughtRiskService = DroughtRiskService.createStubWith();
    const droughtRiskController = new DroughtRiskController(droughtRiskService);
    const request = { params: { lat, lon } };

    // When
    const promise = droughtRiskController.getDroughtRiskByCoordinateLocation(
      request as any,
      responseToolkitForTest,
    );

    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
