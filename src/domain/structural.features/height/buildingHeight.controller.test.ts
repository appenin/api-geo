import { Request, ResponseToolkit } from '@hapi/hapi';

import { BuildingHeightController } from './buildingHeight.controller';
import { BuildingHeightService } from './buildingHeight.service';

describe('Building Height Controller', () => {
  it('Should return building height for a given IDAddress', async () => {
    // Arrange
    const idAddress = '75107_8909_00020';
    const buildingHeightService = BuildingHeightService.createStubWith({
      ign_hauteur_batiment: 27,
    });
    const buildingHeightController = new BuildingHeightController(buildingHeightService);
    const request = { params: { idAddress } };
    const h = {
      response: (result: any) => ({
        code: (statusCode: number) => ({ statusCode, source: result }),
      }),
    };

    // Act
    const { statusCode, source } = await buildingHeightController.getBuildingHeightFromIDAddress(
      request as unknown as Request,
      h as ResponseToolkit,
    );

    // Assert
    expect(statusCode).toBe(200);
    expect(source).toBeDefined();
  });
});
