import { Request, ResponseToolkit } from '@hapi/hapi';

import { ElectricalConsumptionController } from './electricalConsumption.controller';
import { ElectricalConsumptionService } from './electricalConsumption.service';

describe('getElectricalConsumptionFromIDAddress', () => {
  it('should return the electrical consumption for a given ID address', async () => {
    // Arrange
    const idAddressTest = '75107_8909_00020';
    const electricalConsumptionServide = ElectricalConsumptionService.createStubWith({
      ademe_consommation_electrique_residentiel_par_pdl: 3925.547,
    });
    const electricalConsumptionController = new ElectricalConsumptionController(
      electricalConsumptionServide,
    );
    const request = { params: { idAddressTest } };
    const h = {
      response: (result: any) => ({
        code: (statusCode: number) => ({ statusCode, source: result }),
      }),
    };

    // Act
    const { statusCode, source } =
      await electricalConsumptionController.getElectricalConsumptionFromIDAddress(
        request as unknown as Request,
        h as ResponseToolkit,
      );

    // Assert
    expect(statusCode).toBe(200);
    expect(source).toBeDefined();
  });
});
