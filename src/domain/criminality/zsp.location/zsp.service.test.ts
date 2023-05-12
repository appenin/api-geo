import { ZspService } from './zsp.service';

describe('ZspService', () => {
  let zspService: ZspService;
  it('should return zsp value with coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    zspService = ZspService.createStubWith({
      minterieur_zsp_presence: 0,
    });
    // When
    const zsp = await zspService.getZspByCoordinateLocation(lat, lon);
    // Then
    expect(zsp.minterieur_zsp_presence).toBe(0);
  });

  it('should return a null zsp value', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    zspService = ZspService.createStubWith();
    // When
    const zsp = await zspService.getZspByCoordinateLocation(lat, lon);
    // Then
    expect(zsp.minterieur_zsp_presence).toBeNull();
  });
});
