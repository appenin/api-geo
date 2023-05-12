import { HouseholdService } from './household.service';

describe('HouseholdService', () => {
  let service: HouseholdService;
  const lat = 48.85049165036697;
  const lon = 2.308362857670213;

  it('should find household income density for a given coordinate location', async () => {
    // Given
    service = HouseholdService.createStubWith({
      insee_filosofi_densite_menage_km2: 6101.37,
    });

    // When
    const householdDensity = await service.getHouseholdByCoordinateLocation(lat, lon);

    // Then
    expect(householdDensity.insee_filosofi_densite_menage_km2).toBe(6101.37);
  });

  it('should return a null object with an invalid coordinate location', async () => {
    // Given
    service = HouseholdService.createStubWith();

    // When
    const householdDensity = await service.getHouseholdByCoordinateLocation(lat, lon);

    // Then
    expect(householdDensity.insee_filosofi_densite_menage_km2).toBeNull();
  });
});
