import { responseToolkitForTest } from '../../../libs/http';
import { EpciController } from './epci.controller';
import { EpciService } from './epci.service';

describe('EpciController', () => {
  it('should return EPCI (Etablissement Public de Coopération Intercommunale) for a given insee code', async () => {
    // Given
    const codeInsee = '01002';

    const epciService = EpciService.createStubWith({
      lib_epci: "CC de la Plaine de l'Ain",
      code_epci: '240100883',
    });
    const epciController = new EpciController(epciService);
    const request = { params: { codeInsee } };
    // When
    const { statusCode, source } = await epciController.getEpciByCodeInsee(
      request as any,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      lib_epci: "CC de la Plaine de l'Ain",
      code_epci: '240100883',
    });
  });
  it('should throw an error with invalid insee code', async () => {
    // Given
    const codeInsee = '0000000000000000000000';
    const epciService = EpciService.createStubWith();
    const epciController = new EpciController(epciService);
    const request = { params: { codeInsee } };

    // When
    const promise = epciController.getEpciByCodeInsee(request as any, responseToolkitForTest);

    // Then
    await expect(() => promise).rejects.toThrow('[!] Invalid code Insee provided');
  });

});
