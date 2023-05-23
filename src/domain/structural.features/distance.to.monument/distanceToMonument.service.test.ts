import { DistanceToMonumentService } from './distanceToMonument.service';

describe('DistanceToMonumentService', () => {
  it('Should return distance to monument for a given IDAddress', async () => {
    // Arrange
    const idAddress = '75107_8909_00020';
    const distanceToMonumentService = DistanceToMonumentService.createStubWith({
      merime_distance_monument_historique_500min: 454,
    });
    // Act
    const distanceToMonument = await distanceToMonumentService.getDistanceToMonumentFromIDAddress(
      idAddress,
    );

    // Assert
    expect(distanceToMonument.merime_distance_monument_historique_500min).toBe(454);
  });
});
