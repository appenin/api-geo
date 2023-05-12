import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMunicipalityParams } from '../../../params/municipality.params';
import { UrbanTypologyService } from './urbanTypology.service';

export class UrbanTypologyController {
  constructor(
    private readonly urbanTypologyService: UrbanTypologyService = UrbanTypologyService.create(),
  ) {}

  async getUrbanTypologyByCodeInsee(request: Request, h: ResponseToolkit) {
    if (!hasValidMunicipalityParams(request.params)) {
      const error = Boom.badRequest('[!] Invalid code Insee provided.');
      throw error;
    }
    const { codeInsee } = request.params;
    const urbanTypology = await this.urbanTypologyService.getUrbanTypologyByCodeInsee(codeInsee);
    return h.response(urbanTypology).code(200);
  }
}
