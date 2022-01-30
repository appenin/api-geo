import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../params/coordinates.params';
import { ZspDistanceService } from './zspDistance.service';

export class ZspDistanceController {
  constructor(private readonly zspDistanceService: ZspDistanceService) {}

  async getZspDistanceByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const zsp = await this.zspDistanceService.getZspDistanceByCoordinateLocation(lat, lon);
    return h.response(zsp).code(200);
  }
}
