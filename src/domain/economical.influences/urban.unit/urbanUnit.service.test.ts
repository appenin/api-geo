import { UrbanUnitService } from './urbanUnit.service';

describe('UrbanUnitService', () => {
  let service: UrbanUnitService;
  const codeInsee = '01002';

  it('should find urban unit for a given insee code', async () => {
    // Given
    service = UrbanUnitService.createStubWith({
      insee_code_unite_urbaine_statut_urbain: 3,
      insee_unite_urbaine_statut_urbain: 'hors_unite_urbaine',
    });

    // When
    const urbanUnit = await service.getUrbanUnitByCodeInsee(codeInsee);

    // Then
    expect(urbanUnit.insee_code_unite_urbaine_statut_urbain).toBe(3);
    expect(urbanUnit.insee_unite_urbaine_statut_urbain).toBe('hors_unite_urbaine');
  });

  it('should return a null object with an invalid insee code', async () => {
    // Given
    const codeInsee = '0000000000000000000000';
    service = UrbanUnitService.createStubWith();

    // When
    const urbanUnit = await service.getUrbanUnitByCodeInsee(codeInsee);

    // Then
    expect(urbanUnit.insee_code_unite_urbaine_statut_urbain).toBeNull();
    expect(urbanUnit.insee_unite_urbaine_statut_urbain).toBeNull();
  });
});
