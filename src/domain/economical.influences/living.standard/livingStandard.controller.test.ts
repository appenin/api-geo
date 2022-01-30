import { Server } from '@hapi/hapi';

import { database } from '../../../config/database';
import { LivingStandardController } from './livingStandard.controller';
import { LivingStandardService } from './livingStandard.service';

describe('LivingStandardController', () => {
  const server = new Server();

  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
    await database.end();
  });

  it('should return the living standard for a given coordinate location', async () => {
    // Arrange
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;

    const livingStandardService = LivingStandardService.createStubWith({
      insee_filosofi_niveaux_de_vie_moyen: 1,
    });
    const livingStandardController = new LivingStandardController(livingStandardService);

    const request = { params: { lat, lon } };
    const h = {
      response: (result: any) => ({
        code: (statusCode: number) => ({ statusCode, source: result }),
      }),
    };

    // Act
    const { statusCode, source } =
      await livingStandardController.getLivingStandardByCoordinateLocation(
        request as any,
        h as any,
      );

    // Assert
    expect(statusCode).toBe(200);
    expect(source).toBeDefined();
  });
});
