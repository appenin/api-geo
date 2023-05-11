import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMunicipalityParams } from '../../../params/municipality.params';
import { UrbanUnitService } from './urbanUnit.service';

export class UrbanUnitController {
  constructor(private readonly urbanUnitService: UrbanUnitService = UrbanUnitService.create()) {}

  async getUrbanUnitByCodeInsee(request: Request, h: ResponseToolkit) {
    if (!hasValidMunicipalityParams(request.params))
      if (!hasValidMunicipalityParams(request.params)) {
        const error = Boom.badRequest('[!] Invalid code Insee provided.');
        throw error;
      }
    const { codeInsee } = request.params;
    const urbanUnit = await this.urbanUnitService.getUrbanUnitByCodeInsee(codeInsee);
    return h.response(urbanUnit).code(200);
  }
}
