import { EpciService } from './epci.service';

describe('EpciService', () => {
  let service: EpciService;

  it('shoud return EPCI (Etablissement Public de Coopération Intercommunale) for a given insee code', async () => {
    // Given
    service = EpciService.createStubWith({
      lib_epci: "CC de la Plaine de l'Ain",
      code_epci: '240100883',
    });

    // When
    const epci = await service.getEpciByCodeInsee('01002');

    // Then
    expect(epci.code_epci).toBe('240100883');
  });

  it('should return a null EPCI with incorrect insee code', async () => {
    // Given
    service = EpciService.createStubWith();

    // When
    const epci = await service.getEpciByCodeInsee('plip');

    // Then
    expect(epci.lib_epci).toBeNull();
    expect(epci.code_epci).toBeNull();
  });
});
