import { Request, ResponseToolkit } from '@hapi/hapi';

import { FirehouseController } from './firehouse.controllers';
import { FirehouseService } from './firehouse.service';

describe('FirehouseController', () => {
  it('Should return firehouses for a given code Insee', async () => {
    // Arrange
    const codeInsee = '75107';

    const firehouseService = FirehouseService.createStubWith({
      dggn_nombre_caserne_pompiers_commune: 1,
    });

    const firehouseController = new FirehouseController(firehouseService);

    const request = { params: { codeInsee } };

    const h = {
      response: (result: any) => ({
        code: (statusCode: number) => ({ statusCode, source: result }),
      }),
    };

    // Act
    const { statusCode, source } = await firehouseController.getFirehousesByCodeInsee(
      request as unknown as Request,
      h as ResponseToolkit,
    );

    // Assert
    expect(statusCode).toBe(200);
    expect(source).toBeDefined();
  });
});
