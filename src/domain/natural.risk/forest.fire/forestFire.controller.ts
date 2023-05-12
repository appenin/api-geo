import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMunicipalityParams } from '../../../params/municipality.params';
import { ForestFireService } from './forestFire.service';

export class ForestFireController {
  constructor(private readonly forestFireService: ForestFireService = ForestFireService.create()) {}

  async getForestFireByCodeInsee(request: Request, h: ResponseToolkit) {
    if (!hasValidMunicipalityParams(request.params)) {
      const error = Boom.badRequest('[!] Invalid code Insee provided.');
      throw error;
    }
    const { codeInsee } = request.params;
    const forestFire = await this.forestFireService.getForestFireByCodeInsee(codeInsee);
    return h.response(forestFire).code(200);
  }
}
