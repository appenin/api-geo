import { YearOfConstructionService } from './yearOfConstruction.service';

describe('YearOfConstructionService', () => {
  it('Should return year of construction for a given IDAddress', async () => {
    // Arrange
    const idAddress = '75107_8909_00020';
    const yearOfConstructionService = YearOfConstructionService.createStubWith({
      ffo_annee_construction: '1931',
    });

    // Act
    const yearOfConstruction = await yearOfConstructionService.getYearOfConstructionFromIDAddress(
      idAddress,
    );

    // Assert
    expect(yearOfConstruction.ffo_annee_construction).toBe('1931');
  });
});
