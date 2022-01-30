import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../params/coordinates.params';
import { HouseholdService } from './household.service';

export class HouseholdController {
  constructor(private readonly householdService: HouseholdService) {}

  async getHouseholdByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const household = await this.householdService.getHouseholdByCoordinateLocation(lat, lon);
    return h.response(household).code(200);
  }
}
