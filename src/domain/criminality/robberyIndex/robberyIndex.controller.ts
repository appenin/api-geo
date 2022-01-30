import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMunicipalityParams } from '../../../params/municipality.params';
import { RobberyIndexService } from './robberyIndex.service';

export class RobberIndexController {
  constructor(private readonly robberyIndexService: RobberyIndexService) {}

  async getRobberyIndexByCodeInsee(request: Request, h: ResponseToolkit) {
    if (!hasValidMunicipalityParams(request.params)) {
      const error = Boom.badRequest('[!] Invalid code Insee provided.');
      throw error;
    }
    const { codeInsee } = request.params;
    const robberyIndex = await this.robberyIndexService.getRobberyIndexByCodeInsee(codeInsee);
    return h.response(robberyIndex).code(200);
  }
}
