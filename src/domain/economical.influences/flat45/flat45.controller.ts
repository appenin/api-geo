import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../params/coordinates.params';
import { Flat45Service } from './flat45.service';

export class Flat45Controller {
  constructor(private readonly flat45Service: Flat45Service) {}

  async getFlat45ByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const qpv = await this.flat45Service.getFlat45ByCoordinateLocation(lat, lon);
    return h.response(qpv).code(200);
  }
}
