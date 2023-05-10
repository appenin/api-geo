import { LivingStandardService } from './livingStandard.service';

describe('LivingStandardService', () => {
  let service: LivingStandardService;
  const lat = 48.85049165036697;
  const lon = 2.308362857670213;

  it('should find living standard for a given coordinate location', async () => {
    // Given
    service = LivingStandardService.createStubWith({
      insee_filosofi_niveaux_de_vie_moyen: 49044.88,
    });

    // When
    const livingStandard = await service.getLivingStandardByCoordinateLocation(lat, lon);

    // Then
    expect(livingStandard.insee_filosofi_niveaux_de_vie_moyen).toBe(49044.88);
  });

  it('should return a null object with an invalid coordinate location', async () => {
    // Given
    service = LivingStandardService.createStubWith();

    // When
    const livingStandard = await service.getLivingStandardByCoordinateLocation(lat, lon);

    // Then
    expect(livingStandard.insee_filosofi_niveaux_de_vie_moyen).toBeNull();
  });
});
