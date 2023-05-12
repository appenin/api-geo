import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../params/coordinates.params';
import { SubmersionRiskService } from './marineSubmersion.service';

export class SubmersionRiskController {
  constructor(
    private readonly submersionRiskService: SubmersionRiskService = SubmersionRiskService.create(),
  ) {}

  async getSubmersionRiskByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const submersionRisk = await this.submersionRiskService.getSubmersionRiskByCoordinateLocation(
      lat,
      lon,
    );
    return h.response(submersionRisk).code(200);
  }
}
