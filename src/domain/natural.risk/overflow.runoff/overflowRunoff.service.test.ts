import { OverflowRunoffRiskService } from './overflowRunoff.service';

describe('OverflowRunoffRiskService', () => {
  let service: OverflowRunoffRiskService;
  const lat = 48.85049165036697;
  const lon = 2.308362857670213;

  it('should find overflown risk a given coordinate location', async () => {
    // Given
    service = OverflowRunoffRiskService.createStubWith({
      overflow_runoff: 0,
    });

    // When
    const droughtRisk = await service.getOverflowRunoffRiskByCoordinateLocation(lat, lon);

    // Then
    expect(droughtRisk.overflow_runoff).toBe(0);
  });

  it('should return a null object with an invalid coordinate location', async () => {
    // Given
    service = OverflowRunoffRiskService.createStubWith();

    // When
    const droughtRisk = await service.getOverflowRunoffRiskByCoordinateLocation(lat, lon);

    // Then
    expect(droughtRisk.overflow_runoff).toBeNull();
  });
});
