import { Request, ResponseToolkit } from '@hapi/hapi';

import { HeatingSystemController } from './heatingSystem.controller';
import { HeatingSystemService } from './heatingSystem.service';

describe('HeatingSystemController', () => {
  it('Should return heating system for a given IDAddress', async () => {
    // Arrange
    const idAddress = '75107_8909_00020';
    const heatingSystemService = HeatingSystemService.createStubWith({
      ademe_logement_type_intallation_chauffage: null,
    });
    const heatingSystemController = new HeatingSystemController(heatingSystemService);
    const request = { params: { idAddress } };
    const h = {
      response: (result: any) => ({
        code: (statusCode: number) => ({ statusCode, source: result }),
      }),
    };

    // Act
    const { statusCode, source } = await heatingSystemController.getHeatingSytemFromIDAddress(
      request as unknown as Request,
      h as ResponseToolkit,
    );

    // Assert
    expect(statusCode).toBe(200);
    expect(source).toBeDefined();
  });
});
