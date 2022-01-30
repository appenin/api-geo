import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../params/coordinates.params';
import { OverflowRunoffRiskService } from './overflowRunoff.service';

export class OverflowRunoffRiskController {
  constructor(private readonly overflowRunoffRiskService: OverflowRunoffRiskService) {}

  async getOverflowRunoffRiskByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const overflowRunoffRisk =
      await this.overflowRunoffRiskService.getOverflowRunoffRiskByCoordinateLocation(lat, lon);
    return h.response(overflowRunoffRisk).code(200);
  }
}
