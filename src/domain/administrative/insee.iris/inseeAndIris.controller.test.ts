import { Request, ResponseToolkit, Server } from '@hapi/hapi';

import { InseeAndIrisController } from './inseeAndIris.controller';
import { InseeAndIrisService } from './irisAndInsee.service';

describe('InseeAndIrisController', () => {
  const server = new Server();

  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should return insee and iris information for a given coordinate location', async () => {
    // Arrange
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;

    const inseeAndIrisService = InseeAndIrisService.createStubWith({
      codeInsee: '75107',
      codeIris: '8909',
      municipalityName: 'Paris',
      irisName: null,
    });
    const inseeAndIrisController = new InseeAndIrisController(inseeAndIrisService);

    const request = { params: { lat, lon } };
    const h = {
      response: (result: any) => ({
        code: (statusCode: number) => ({ statusCode, source: result }),
      }),
    };

    // Act
    const { statusCode, source } = await inseeAndIrisController.getInseeAndIrisByCoordinateLocation(
      request as unknown as Request,
      h as ResponseToolkit,
    );

    // Assert
    expect(statusCode).toBe(200);
    expect(source).toBeDefined();
  });
});
