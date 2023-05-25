import { Buildings50mService } from './buildings50m.service';

describe('Buildings50mService', () => {
  let buildings50mService: Buildings50mService;
  it('should return buildings density with 50m around coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;
    buildings50mService = Buildings50mService.createStubWith({
      buildings_50m: 73,
    });
    // When
    const buildingsDensity = await buildings50mService.getBuildings50mByCoordinateLocation(
      lat,
      lon,
    );
    // Then
    expect(buildingsDensity.buildings_50m).toBe(73);
  });

  it('should return a null buildings density', async () => {
    // Given
    const lat = 0.0;
    const lon = 10.0;
    buildings50mService = Buildings50mService.createStubWith();
    // When
    const buildingsDensity = await buildings50mService.getBuildings50mByCoordinateLocation(
      lat,
      lon,
    );
    // Then
    expect(buildingsDensity.buildings_50m).toBeNull();
  });
});
