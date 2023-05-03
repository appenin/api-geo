import { Buildings500mService } from './buildings500m.service';

describe('Buildings500mService', () => {
  let buildings500mService: Buildings500mService;
  it('should return buildings density with 500m around coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    buildings500mService = Buildings500mService.createStubWith({
      buildings_500m: 73,
    });
    // When
    const buildingsDensity = await buildings500mService.getBuildings500mByCoordinateLocation(
      lat,
      lon,
    );
    // Then
    expect(buildingsDensity.buildings_500m).toBe(73);
  });

  it('should return a null buildings density', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    buildings500mService = Buildings500mService.createStubWith();
    // When
    const buildingsDensity = await buildings500mService.getBuildings500mByCoordinateLocation(lat, lon);
    // Then
    expect(buildingsDensity.buildings_500m).toBeNull();
  });
});
