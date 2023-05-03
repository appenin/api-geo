import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../../params/coordinates.params';
import { Buildings100mService } from './buildings100m.service';

export class Buildings100mController {
  constructor(
    private readonly building100mService: Buildings100mService = Buildings100mService.create(),
  ) {}

  async getBuildings100mByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const building100m = await this.building100mService.getBuildings100mByCoordinateLocation(
      lat,
      lon,
    );
    return h.response(building100m).code(200);
  }
}
