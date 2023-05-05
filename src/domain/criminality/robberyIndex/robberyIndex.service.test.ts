import { RobberyIndexService } from './robberyIndex.service';

describe('RobberyIndexService', () => {
  let robberyIndexService: RobberyIndexService;
  it('should return robbery index value by insee code', async () => {
    // Given
    robberyIndexService = RobberyIndexService.createStubWith({
      minterieur_indicateur_crime_delit_commune_cambriolage_taux_pour_mille: 11.613,
    });
    // When
    const robberyIndex = await robberyIndexService.getRobberyIndexByCodeInsee('01002');
    // Then
    expect(robberyIndex.minterieur_indicateur_crime_delit_commune_cambriolage_taux_pour_mille).toBe(
      11.613,
    );
  });

  it('should return a null robbery value', async () => {
    // Given
    robberyIndexService = RobberyIndexService.createStubWith();
    // When
    const robberyIndex = await robberyIndexService.getRobberyIndexByCodeInsee('plip');
    // Then
    expect(
      robberyIndex.minterieur_indicateur_crime_delit_commune_cambriolage_taux_pour_mille,
    ).toBeNull();
  });
});
