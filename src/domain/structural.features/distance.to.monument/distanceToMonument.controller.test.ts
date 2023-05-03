import { Request, ResponseToolkit } from '@hapi/hapi';

import { DistanceToMonumentController } from './distanceToMonument.controller';
import { DistanceToMonumentService } from './distanceToMonument.service';

describe('DistanceToMonumentController', () => {
  it('Should return distance to monument for a given IDAddress', async () => {
    // Arrange
    const idAddress = '75107_8909_00020';
    const distanceToMonumentService = DistanceToMonumentService.createStubWith({
      merime_distance_monument_historique_500min: 454,
    });
    const distanceToMonumentController = new DistanceToMonumentController(
      distanceToMonumentService,
    );
    const request = { params: { idAddress } };
    const h = {
      response: (result: any) => ({
        code: (statusCode: number) => ({ statusCode, source: result }),
      }),
    };
    // Act
    const { statusCode, source } =
      await distanceToMonumentController.getDistanceToMonumentFromIDAddress(
        request as unknown as Request,
        h as ResponseToolkit,
      );

    // Assert
    expect(statusCode).toBe(200);
    expect(source).toBeDefined();
  });
});
