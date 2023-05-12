import { DroughtRiskService } from './droughtRisk.service';

describe('DroughtRiskService', () => {
  let service: DroughtRiskService;
  const lat = 48.85049165036697;
  const lon = 2.308362857670213;

  it('should find drought risk a given coordinate location', async () => {
    // Given
    service = DroughtRiskService.createStubWith({
      drought_risk: 1,
    });

    // When
    const droughtRisk = await service.getDroughtRiskByCoordinateLocation(lat, lon);

    // Then
    expect(droughtRisk.drought_risk).toBe(1);
  });

  it('should return a null object with an invalid coordinate location', async () => {
    // Given
    service = DroughtRiskService.createStubWith();

    // When
    const droughtRisk = await service.getDroughtRiskByCoordinateLocation(lat, lon);

    // Then
    expect(droughtRisk.drought_risk).toBeNull();
  });
});
