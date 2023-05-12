import { SubmersionRiskService } from './marineSubmersion.service';

describe('DroughtRiskService', () => {
  let service: SubmersionRiskService;
  const lat = 48.85049165036697;
  const lon = 2.308362857670213;

  it('should find submersion risk for a given coordinate location', async () => {
    // Given
    service = SubmersionRiskService.createStubWith({
      marine_submersion: 0,
    });

    // When
    const submersionRisk = await service.getSubmersionRiskByCoordinateLocation(lat, lon);

    // Then
    expect(submersionRisk.marine_submersion).toBe(0);
  });

  it('should return a null object with an invalid coordinate location', async () => {
    // Given
    service = SubmersionRiskService.createStubWith();

    // When
    const submersionRisk = await service.getSubmersionRiskByCoordinateLocation(lat, lon);

    // Then
    expect(submersionRisk.marine_submersion).toBeNull();
  });
});
