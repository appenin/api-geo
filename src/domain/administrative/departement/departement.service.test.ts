import { DepartementService } from './departement.service';

describe('DepartementService', () => {
  let service: DepartementService;
  it('should return a department by insee code', async () => {
    // Given
    service = DepartementService.createStubWith({
      code_departement: '01',
      lib_departement: 'Ain',
    });

    // When
    const departement = await service.getDepartmentByCodeInsee('01002');

    // Then
    expect(departement.code_departement).toBe('01');
    expect(departement.lib_departement).toBe('Ain');
  });

  it('should return a null department with incorrect insee code', async () => {
    // Given
    service = DepartementService.createStubWith();

    // When
    const departement = await service.getDepartmentByCodeInsee('Plop');

    // Then
    expect(departement.code_departement).toBeNull();
    expect(departement.lib_departement).toBeNull();
  });
});
