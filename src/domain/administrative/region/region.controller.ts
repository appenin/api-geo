import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMunicipalityParams } from '../../../params/municipality.params';
import { RegionService } from './region.service';

export class RegionController {
  constructor(private readonly regionService: RegionService = RegionService.create()) {}

  async getRegionByCodeInsee(request: Request, h: ResponseToolkit) {
    if (!hasValidMunicipalityParams(request.params)) {
      const error = Boom.badRequest('[!] Invalid code Insee provided.');
      throw error;
    }
    const { codeInsee } = request.params;
    const region = await this.regionService.getRegionByCodeInsee(codeInsee);
    return h.response(region).code(200);
  }
}
