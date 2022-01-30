import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMunicipalityParams } from '../../../params/municipality.params';
import { FirehouseService } from './firehouse.service';

export class FirehouseController {
  constructor(private readonly firehouseService: FirehouseService) {}

  async getFirehousesByCodeInsee(request: Request, h: ResponseToolkit) {
    if (!hasValidMunicipalityParams(request.params)) {
      const error = Boom.badRequest('[!] Invalid code Insee provided.');
      throw error;
    }
    const { codeInsee } = request.params;
    const firehouses = await this.firehouseService.getFirehousesByCodeInsee(codeInsee);
    return h.response(firehouses).code(200);
  }
}
