import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMunicipalityParams } from '../../../params/municipality.params';
import { ClimaticRegionService } from './climaticRegion.service';

export class ClimaticRegionController {
  constructor(
    private readonly climaticRegionService: ClimaticRegionService = ClimaticRegionService.create(),
  ) {}

  async getClimateByCodeInsee(request: Request, h: ResponseToolkit) {
    if (!hasValidMunicipalityParams(request.params)) {
      const error = Boom.badRequest('[!] Invalid code Insee provided.');
      throw error;
    }
    const { codeInsee } = request.params;
    const urbanTypology = await this.climaticRegionService.getClimateByCodeInsee(codeInsee);
    return h.response(urbanTypology).code(200);
  }
}
