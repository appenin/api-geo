import { UrbanTypologyService } from './urbanTypology.service';

describe('UrbanTypologyService', () => {
  let service: UrbanTypologyService;
  const codeInsee = '01002';

  it('should find urban typology for a given insee code', async () => {
    // Given
    service = UrbanTypologyService.createStubWith({
      insee_code_unite_urbaine_typologie_urbaine: 4,
      insee_unite_urbaine_typologie_urbaine: 'rural_autonome_tres_peu_dense',
    });

    // When
    const urbanTypology = await service.getUrbanTypologyByCodeInsee(codeInsee);

    // Then
    expect(urbanTypology.insee_code_unite_urbaine_typologie_urbaine).toBe(4);
    expect(urbanTypology.insee_unite_urbaine_typologie_urbaine).toBe(
      'rural_autonome_tres_peu_dense',
    );
  });

  it('should return a null object with an invalid insee code', async () => {
    // Given
    const codeInsee = '0000000000000000000000';
    service = UrbanTypologyService.createStubWith();

    // When
    const urbanTypology = await service.getUrbanTypologyByCodeInsee(codeInsee);

    // Then
    expect(urbanTypology.insee_code_unite_urbaine_typologie_urbaine).toBeNull();
    expect(urbanTypology.insee_unite_urbaine_typologie_urbaine).toBeNull();
  });
});
