import { Buildings100mService } from './buildings100m.service';

describe('Buildings100mService', () => {
  let buildings100mService: Buildings100mService;
  it('should return buildings density with 100m around coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    buildings100mService = Buildings100mService.createStubWith({
      buildings_100m: 73,
    });
    // When
    const buildingsDensity = await buildings100mService.getBuildings100mByCoordinateLocation(
      lat,
      lon,
    );
    // Then
    expect(buildingsDensity.buildings_100m).toBe(73);
  });

  it('should return a null buildings density', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    buildings100mService = Buildings100mService.createStubWith();
    // When
    const buildingsDensity = await buildings100mService.getBuildings100mByCoordinateLocation(lat, lon);
    // Then
    expect(buildingsDensity.buildings_100m).toBeNull();
  });
});
