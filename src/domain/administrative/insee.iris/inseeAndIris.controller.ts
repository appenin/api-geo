import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../params/coordinates.params';
import { InseeAndIrisService } from './inseeAndIris.service';

export class InseeAndIrisController {
  constructor(
    private readonly inseeAndIrisService: InseeAndIrisService = InseeAndIrisService.create(),
  ) {}

  async getInseeAndIrisByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const irisAndInsee = await this.inseeAndIrisService.getInseeAndIrisByCoordinateLocation(
      lat,
      lon,
    );
    return h.response(irisAndInsee).code(200);
  }
}
