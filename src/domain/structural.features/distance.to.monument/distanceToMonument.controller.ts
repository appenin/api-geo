import { Request, ResponseToolkit } from '@hapi/hapi';

import { IDAddressRequestParams } from '../../../params/IDAddress.params';
import { DistanceToMonumentService } from './distanceToMonument.service';

export class DistanceToMonumentController {
  constructor(
    private readonly distanceToMonumentService: DistanceToMonumentService = DistanceToMonumentService.create(),
  ) {}

  async getDistanceToMonumentFromIDAddress(request: Request, h: ResponseToolkit) {
    const { IDAddress } = request.params as IDAddressRequestParams;
    const distanceToMonument =
      await this.distanceToMonumentService.getDistanceToMonumentFromIDAddress(IDAddress);
    return h.response(distanceToMonument).code(200);
  }
}
