import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../../params/coordinates.params';
import { Buildings200mService } from './buildings200m.service';

export class Buildings200mController {
  constructor(private readonly building200mService: Buildings200mService) {}

  async getBuildings200mByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const building200m = await this.building200mService.getBuildings200mByCoordinateLocation(
      lat,
      lon,
    );
    return h.response(building200m).code(200);
  }
}
