import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMunicipalityParams } from '../../../params/municipality.params';
import { EpciService } from './epci.service';

export class EpciController {
  constructor(private readonly epciService: EpciService = EpciService.create()) {}

  async getEpciByCodeInsee(request: Request, h: ResponseToolkit) {
    if (!hasValidMunicipalityParams(request.params)) {
      const error = Boom.badRequest('[!] Invalid code Insee provided.');
      throw error;
    }
    const { codeInsee } = request.params;
    const epci = await this.epciService.getEpciByCodeInsee(codeInsee);
    return h.response(epci).code(200);
  }
}
