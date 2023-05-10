import { responseToolkitForTest } from '../../../libs/http';
import { UrbanTypologyController } from './urbanTypology.controller';
import { UrbanTypologyService } from './urbanTypology.service';

describe('UrbanTypologyService', () => {
  it('should find urban typology for a given insee code', async () => {
    // Given
    const codeInsee = '01002';

    const urbanTypologyService = UrbanTypologyService.createStubWith({
      insee_code_unite_urbaine_typologie_urbaine: 4,
      insee_unite_urbaine_typologie_urbaine: 'rural_autonome_tres_peu_dense',
    });
    const urbanTypologyController = new UrbanTypologyController(urbanTypologyService);
    const request = { params: { codeInsee } };
    // When
    const { statusCode, source } = await urbanTypologyController.getUrbanTypologyByCodeInsee(
      request as any,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      insee_code_unite_urbaine_typologie_urbaine: 4,
      insee_unite_urbaine_typologie_urbaine: 'rural_autonome_tres_peu_dense',
    });
  });
  it('should throw an error with invalid insee code', async () => {
    // Given
    const codeInsee = '0000000000000000000000';
    const urbanTypologyService = UrbanTypologyService.createStubWith();
    const urbanTypologyController = new UrbanTypologyController(urbanTypologyService);
    const request = { params: { codeInsee } };

    // When
    const promise = urbanTypologyController.getUrbanTypologyByCodeInsee(
      request as any,
      responseToolkitForTest,
    );

    // Then
    await expect(() => promise).rejects.toThrow('[!] Invalid code Insee provided');
  });
});
