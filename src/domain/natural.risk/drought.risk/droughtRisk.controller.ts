import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import logger from '../../../libs/logger';
import { hasValidCoordinates } from '../../../params/coordinates.params';
import { DroughtRiskService } from './droughtRisk.service';

export class DroughtRiskController {
  constructor(
    private readonly droughtRiskService: DroughtRiskService = DroughtRiskService.create(),
  ) {}

  async getDroughtRiskByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      logger.error(error.message, error.message);
      throw error;
    }
    const { lat, lon } = request.params;
    const droughtRisk = await this.droughtRiskService.getDroughtRiskByCoordinateLocation(lat, lon);
    return h.response(droughtRisk).code(200);
  }
}
