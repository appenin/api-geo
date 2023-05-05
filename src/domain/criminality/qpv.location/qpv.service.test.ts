import { QpvService } from './qpv.service';

describe('QpvService', () => {
  let qpvService: QpvService;
  it('should return priority district value with coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    qpvService = QpvService.createStubWith({
      anct_qpv_presence: 0,
    });
    // When
    const qpv = await qpvService.getQpvByCoordinateLocation(lat, lon);
    // Then
    expect(qpv.anct_qpv_presence).toBe(0);
  });

  it('should return a null priority district value', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    qpvService = QpvService.createStubWith();
    // When
    const qpv = await qpvService.getQpvByCoordinateLocation(lat, lon);
    // Then
    expect(qpv.anct_qpv_presence).toBeNull();
  });
});
