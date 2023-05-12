import { responseToolkitForTest } from '../../../libs/http';
import { ForestFireController } from './forestFire.controller';
import { ForestFireService } from './forestFire.service';

describe('ForestFireController', () => {
  it('should find number of fire station for a given Insee code', async () => {
    // Given
    const codeInsee = '01002';

    const forestFireService = ForestFireService.createStubWith({
      gaspar_feu_foret: false,
    });
    const forestFireController = new ForestFireController(forestFireService);
    const request = { params: { codeInsee } };
    // When
    const { statusCode, source } = await forestFireController.getForestFireByCodeInsee(
      request as any,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      gaspar_feu_foret: false,
    });
  });
  it('should throw an error with invalid insee code', async () => {
    // Given
    const codeInsee = '0000000000000000000000';
    const forestFireService = ForestFireService.createStubWith();
    const forestFireController = new ForestFireController(forestFireService);
    const request = { params: { codeInsee } };

    // When
    const promise = forestFireController.getForestFireByCodeInsee(
      request as any,
      responseToolkitForTest,
    );

    // Then
    await expect(() => promise).rejects.toThrow('[!] Invalid code Insee provided');
  });
});
