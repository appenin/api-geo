import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../../params/coordinates.params';
import { Buildings50mService } from './buildings50m.service';

export class Buildings50mController {
  constructor(
    private readonly building50mService: Buildings50mService = Buildings50mService.create(),
  ) {}

  async getBuildings50mByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const building50m = await this.building50mService.getBuildings50mByCoordinateLocation(lat, lon);
    return h.response(building50m).code(200);
  }
}
