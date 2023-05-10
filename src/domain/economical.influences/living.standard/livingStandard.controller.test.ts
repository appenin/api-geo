import { responseToolkitForTest } from '../../../libs/http';
import { LivingStandardController } from './livingStandard.controller';
import { LivingStandardService } from './livingStandard.service';

describe('LivingStandardController', () => {
  it('should return the living standard for a given coordinate location', async () => {
    // Arrange
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;

    const livingStandardService = LivingStandardService.createStubWith({
      insee_filosofi_niveaux_de_vie_moyen: 1,
    });
    const livingStandardController = new LivingStandardController(livingStandardService);

    const request = { params: { lat, lon } };

    // Act
    const { statusCode, source } =
      await livingStandardController.getLivingStandardByCoordinateLocation(
        request as any,
        responseToolkitForTest,
      );

    // Assert
    expect(statusCode).toBe(200);
    expect(source).toBeDefined();
  });
});
