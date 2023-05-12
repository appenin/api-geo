import { responseToolkitForTest } from '../../../libs/http';
import { UrbanUnitController } from './urbanUnit.controller';
import { UrbanUnitService } from './urbanUnit.service';

describe('UrbanTypologyService', () => {
  it('should find urban unit for a given insee code', async () => {
    // Given
    const codeInsee = '01002';

    const urbanUnitService = UrbanUnitService.createStubWith({
      insee_code_unite_urbaine_statut_urbain: 3,
      insee_unite_urbaine_statut_urbain: 'hors_unite_urbaine',
    });
    const urbanUnitController = new UrbanUnitController(urbanUnitService);
    const request = { params: { codeInsee } };
    // When
    const { statusCode, source } = await urbanUnitController.getUrbanUnitByCodeInsee(
      request as any,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      insee_code_unite_urbaine_statut_urbain: 3,
      insee_unite_urbaine_statut_urbain: 'hors_unite_urbaine',
    });
  });
  it('should throw an error with invalid insee code', async () => {
    // Given
    const codeInsee = '0000000000000000000000';
    const urbanUnitService = UrbanUnitService.createStubWith();
    const urbanUnitController = new UrbanUnitController(urbanUnitService);
    const request = { params: { codeInsee } };

    // When
    const promise = urbanUnitController.getUrbanUnitByCodeInsee(
      request as any,
      responseToolkitForTest,
    );

    // Then
    await expect(() => promise).rejects.toThrow('[!] Invalid code Insee provided');
  });
});
