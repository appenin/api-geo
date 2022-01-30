import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../params/coordinates.params';
import { LivingStandardService } from './livingStandard.service';

export class LivingStandardController {
  constructor(
    private readonly livingStandardService: LivingStandardService = LivingStandardService.create(),
  ) {}

  async getLivingStandardByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const livingStandard = await this.livingStandardService.getLivingStandardByCoordinateLocation(
      lat,
      lon,
    );
    return h.response(livingStandard).code(200);
  }
}
