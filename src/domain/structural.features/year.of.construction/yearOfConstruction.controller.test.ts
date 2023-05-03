import { Request, ResponseToolkit } from '@hapi/hapi';

import { YearOfConstructionController } from './yearOfConstruction.controller';
import { YearOfConstructionService } from './yearOfConstruction.service';

describe('Year of Construction Controller', () => {
  it('Should return year of construction for a given IDAddress', async () => {
    // Arrange
    const idAddress = '75107_8909_00020';
    const yearOfConstructionService = YearOfConstructionService.createStubWith({
      ffo_annee_construction: '1931',
    });
    const yearOfConstructionController = new YearOfConstructionController(
      yearOfConstructionService,
    );
    const request = { params: { idAddress } };
    const h = {
      response: (result: any) => ({
        code: (statusCode: number) => ({ statusCode, source: result }),
      }),
    };

    // Act
    const { statusCode, source } =
      await yearOfConstructionController.getYearOfConstructionFromIDAddress(
        request as unknown as Request,
        h as ResponseToolkit,
      );

    // Assert
    expect(statusCode).toBe(200);
    expect(source).toBeDefined();
  });
});
