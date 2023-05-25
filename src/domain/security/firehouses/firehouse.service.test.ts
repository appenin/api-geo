import { FirehouseService } from './firehouse.service';

describe('FirehouseService', () => {
  let service: FirehouseService;
  const codeInsee = '01002';

  it('should find number of firehouse for a given insee code', async () => {
    // Given
    service = FirehouseService.createStubWith({
      dggn_nombre_caserne_pompiers_commune: 0,
    });

    // When
    const firehouse = await service.getFirehousesByCodeInsee(codeInsee);

    // Then
    expect(firehouse.dggn_nombre_caserne_pompiers_commune).toBe(0);
  });

  it('should return a null object with an invalid insee code', async () => {
    // Given
    const codeInsee = '0000000000000000000000';
    service = FirehouseService.createStubWith();

    // When
    const firehouse = await service.getFirehousesByCodeInsee(codeInsee);

    // Then
    expect(firehouse.dggn_nombre_caserne_pompiers_commune).toBeNull();
  });
});
