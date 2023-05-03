import { Buildings200mService } from './buildings200m.service';

describe('Buildings200mService', () => {
  let buildings200mService: Buildings200mService;
  it('should return buildings density with 200m around coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    buildings200mService = Buildings200mService.createStubWith({
      buildings_200m: 73,
    });
    // When
    const buildingsDensity = await buildings200mService.getBuildings200mByCoordinateLocation(
      lat,
      lon,
    );
    // Then
    expect(buildingsDensity.buildings_200m).toBe(73);
  });

  it('should return a null buildings density', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    buildings200mService = Buildings200mService.createStubWith();
    // When
    const buildingsDensity = await buildings200mService.getBuildings200mByCoordinateLocation(lat, lon);
    // Then
    expect(buildingsDensity.buildings_200m).toBeNull();
  });
});
