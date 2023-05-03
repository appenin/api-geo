import { responseToolkitForTest } from '../../../libs/http';
import { DepartementController } from './departement.controller';
import { DepartementService } from './departement.service';

describe('DepartementController', () => {
  it('should return department by insee code', async () => {
    // Given
    const codeInsee = '01002';

    const departementService = DepartementService.createStubWith({
      code_departement: '01',
      lib_departement: 'Ain',
    });
    const departementController = new DepartementController(departementService);

    const request = { params: { codeInsee } };

    // When
    const { statusCode, source } = await departementController.getDepartmentByCodeInsee(
      request as any,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      code_departement: '01',
      lib_departement: 'Ain',
    });
  });

  it('should throw an error with invalid insee code', async () => {
    // Given
    const codeInsee = '0000000000000000000000';

    const departementService = DepartementService.createStubWith();
    const departementController = new DepartementController(departementService);

    const request = { params: { codeInsee } };

    // When
    const promise = departementController.getDepartmentByCodeInsee(
      request as any,
      responseToolkitForTest,
    );

    // Then
    await expect(() => promise).rejects.toThrow('[!] Invalid code Insee provided');
  });
});
