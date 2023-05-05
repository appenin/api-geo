import { ZspDistanceService } from './zspDistance.service';

describe('ZspDistanceService', () => {
  let zspDistanceService: ZspDistanceService;
  it('should return zsp distance value with coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    zspDistanceService = ZspDistanceService.createStubWith({
      minterieur_zsp_distance: 4.583,
    });
    // When
    const distance = await zspDistanceService.getZspDistanceByCoordinateLocation(lat, lon);
    // Then
    expect(distance.minterieur_zsp_distance).toBe(4.583);
  });

  it('should return a null zsp distance value', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    zspDistanceService = ZspDistanceService.createStubWith();
    // When
    const distance = await zspDistanceService.getZspDistanceByCoordinateLocation(lat, lon);
    // Then
    expect(distance.minterieur_zsp_distance).toBeNull();
  });
});
