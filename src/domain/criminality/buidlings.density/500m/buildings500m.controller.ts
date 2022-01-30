import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../../params/coordinates.params';
import { Buildings500mService } from './buildings500m.service';

export class Buildings500mController {
  constructor(private readonly building500mService: Buildings500mService) {}

  async getBuildings500mByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const building500m = await this.building500mService.getBuildings500mByCoordinateLocation(
      lat,
      lon,
    );
    return h.response(building500m).code(200);
  }
}
