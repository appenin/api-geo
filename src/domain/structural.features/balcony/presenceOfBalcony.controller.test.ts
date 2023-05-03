import { Request, ResponseToolkit } from '@hapi/hapi';

import { PresenceOfBalconyController } from './presenceOfBalcony.controller';
import { PresenceOfBalconyService } from './presenceOfBalcony.service';

describe('PresenceOfBalconyController', () => {
  it('Should return presence of balcony for a given IDAddress', async () => {
    // Arrange
    const idAddress = '75107_8909_00020';
    const presenceOfBalconyService = PresenceOfBalconyService.createStubWith({
      ademe_logement_type_avancee_balcon_max: 'PAS_BALCON',
    });
    const presenceOfBalconyController = new PresenceOfBalconyController(presenceOfBalconyService);
    const request = { params: { idAddress } };
    const h = {
      response: (result: any) => ({
        code: (statusCode: number) => ({ statusCode, source: result }),
      }),
    };

    // Act
    const { statusCode, source } =
      await presenceOfBalconyController.getPresenceOfBalconyFromIDAddress(
        request as unknown as Request,
        h as ResponseToolkit,
      );

    // Assert
    expect(statusCode).toBe(200);
    expect(source).toBeDefined();
  });
});
