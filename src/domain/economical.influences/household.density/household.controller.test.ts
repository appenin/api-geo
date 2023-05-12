import { Request } from '@hapi/hapi';

import { responseToolkitForTest } from '../../../libs/http';
import { HouseholdController } from './household.controller';
import { HouseholdService } from './household.service';

describe('HouseholdController', () => {
  it('should find household income density for a given coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;

    const householdService = HouseholdService.createStubWith({
      insee_filosofi_densite_menage_km2: 6101.37,
    });
    const householdController = new HouseholdController(householdService);

    const request = { params: { lat, lon } };

    // When
    const { statusCode, source } = await householdController.getHouseholdByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      insee_filosofi_densite_menage_km2: 6101.37,
    });
  });

  it('should throw an error when an invalid coordinate location is given', async () => {
    // Given
    const householdService = HouseholdService.createStubWith();
    const lat = 0.0;
    const lon = 10.0;
    const householdController = new HouseholdController(householdService);
    const request = { params: { lat, lon } };

    // When
    const promise = householdController.getHouseholdByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );

    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
