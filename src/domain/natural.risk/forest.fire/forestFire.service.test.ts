import { ForestFireService } from './forestFire.service';

describe('ForestFireService', () => {
  let service: ForestFireService;

  it('should find number of fire station for a given Insee code', async () => {
    // Given
    service = ForestFireService.createStubWith({
      gaspar_feu_foret: false,
    });

    // When
    const forestFire = await service.getForestFireByCodeInsee('01002');

    // Then
    expect(forestFire.gaspar_feu_foret).toBeFalsy();
  });

  it('should return a null object with an invalid Insee code', async () => {
    // Given
    service = ForestFireService.createStubWith();

    // When
    const forestFire = await service.getForestFireByCodeInsee('00000000000000000000000000');

    // Then
    expect(forestFire.gaspar_feu_foret).toBeNull();
  });
});
