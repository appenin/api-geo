import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMunicipalityParams } from '../../../params/municipality.params';
import { RobberyIndexService } from './robberyIndex.service';

export class RobberIndexController {
  constructor(
    private readonly robberyIndexService: RobberyIndexService = RobberyIndexService.create(),
  ) {}

  async getRobberyIndexByCodeInsee(request: Request, h: ResponseToolkit) {
    if (!hasValidMunicipalityParams(request.params)) {
      const error = Boom.badRequest('[!] Invalid code Insee provided.');
      throw error;
    }
    const { codeInsee } = request.params;
    const robberyIndex = await this.robberyIndexService.getRobberyIndexByCodeInsee(codeInsee);
    return h
      .response({
        minterieur_indicateur_crime_delit_commune_cambriolage_taux_pour_mille:
          robberyIndex.taux_crime_delit_commune_cambriolage_pour_mille,
      })
      .code(200);
  }
}
