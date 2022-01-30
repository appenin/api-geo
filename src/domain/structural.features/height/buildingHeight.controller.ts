import { Request, ResponseToolkit } from '@hapi/hapi';

import { IDAddressRequestParams } from '../../../params/IDAddress.params';
import { BuildingHeightService } from './buildingHeight.service';

export class BuildingHeightController {
  constructor(private readonly buildingHeightService: BuildingHeightService) {}

  async getBuildingHeightFromIDAddress(request: Request, h: ResponseToolkit) {
    const { IDAddress } = request.params as IDAddressRequestParams;
    const buildingHeight = await this.buildingHeightService.getBuildingHeightFromIDAddress(
      IDAddress,
    );

    return h.response(buildingHeight).code(200);
  }
}
