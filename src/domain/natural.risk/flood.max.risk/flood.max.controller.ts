/* eslint-disable dot-notation */
import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordinates } from '../../../params/coordinates.params';
import { SubmersionRiskService } from '../marine.submersion/marineSubmersion.service';
import { OverflowRunoffRiskService } from '../overflow.runoff/overflowRunoff.service';

export class MaxFloodRiskController {
  constructor(
    private readonly overflowRunoffRiskService: OverflowRunoffRiskService,
    private readonly submersionRiskService: SubmersionRiskService,
  ) {}

  async getMaxFloodRiskByCoordinateLocation(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordinates(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
      );
      throw error;
    }
    const { lat, lon } = request.params;
    const overflowRunoffRisk =
      await this.overflowRunoffRiskService.getOverflowRunoffRiskByCoordinateLocation(lat, lon);
    const submersionRisk = await this.submersionRiskService.getSubmersionRiskByCoordinateLocation(
      lat,
      lon,
    );

    const levelFloodRunoffRisk = overflowRunoffRisk['overflow_runoff'];
    const levelSubmersionRisk = submersionRisk['marine_submersion'];

    if (levelFloodRunoffRisk !== null && levelSubmersionRisk !== null) {
      const flood_max_level = Math.max(levelFloodRunoffRisk, levelSubmersionRisk);
      return h.response({ flood_max_level }).code(200);
    }

    return h.response({ flood_max_level: null }).code(200);
  }
}
