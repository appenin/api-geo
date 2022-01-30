import { Request, ResponseToolkit } from '@hapi/hapi';

import { IDAddressRequestParams } from '../../../params/IDAddress.params';
import { ElectricalConsumptionService } from './electricalConsumption.service';

export class ElectricalConsumptionController {
  constructor(
    private readonly electricalConsumptionService: ElectricalConsumptionService = ElectricalConsumptionService.create(),
  ) {}

  async getElectricalConsumptionFromIDAddress(request: Request, h: ResponseToolkit) {
    const { IDAddress } = request.params as IDAddressRequestParams;
    const electricalConsumption =
      await this.electricalConsumptionService.getElectricalConsumptionFromIDAddress(IDAddress);
    return h.response(electricalConsumption).code(200);
  }
}
