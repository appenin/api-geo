import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../params/coordinates.params';
import { QpvService } from './qpv.service';

export class QpvController {
  constructor(private readonly qpvService: QpvService = QpvService.create()) {}

  async getQpvByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const qpv = await this.qpvService.getQpvByCoordinateLocation(lat, lon);
    return h.response(qpv).code(200);
  }
}
