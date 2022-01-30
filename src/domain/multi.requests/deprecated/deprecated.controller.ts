import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { InseeAndIrisService } from '../../administrative/insee.iris/irisAndInsee.service';
import { Buildings50mService } from '../../criminality/buidlings.density/50m/buildings50m.service';
import { Buildings100mService } from '../../criminality/buidlings.density/100m/buildings100m.service';
import { Buildings200mService } from '../../criminality/buidlings.density/200m/buildings200m.service';
import { Buildings500mService } from '../../criminality/buidlings.density/500m/buildings500m.service';
import { DroughtRiskService } from '../../natural.risk/drought.risk/droughtRisk.service';

export const allowedEconomyElements = [
  '',
  'insee-iris',
  'drought-risk',
  'buildings-50m',
  'buildings-100m',
  'buildings-200m',
  'buildings-500m',
];

export class DeprecatedController {
  constructor(
    private readonly inseeAndIrisService: InseeAndIrisService,
    private readonly droughtRisk: DroughtRiskService,
    private readonly builds50: Buildings50mService,
    private readonly builds100: Buildings100mService,
    private readonly builds200: Buildings200mService,
    private readonly builds500: Buildings500mService,
  ) {}

  async getData(request: Request, h: ResponseToolkit) {
    const { lat, lon } = request.params;
    const { query } = request.query as { query: string };
    const elements = (query ?? '').split(',') as Array<
      | 'insee-iris'
      | 'drought-risk'
      | 'flood-risk'
      | 'buildings-50m'
      | 'buildings-100m'
      | 'buildings-200m'
      | 'buildings-500m'
    >;

    const invalidElements = elements.filter((elem) => !allowedEconomyElements.includes(elem));
    if (invalidElements.length > 0) {
      const error = Boom.badRequest(
        `Invalid parameter(s): ${invalidElements.join(
          ', ',
        )}. Allowed parameters: ${allowedEconomyElements.join(', ')}`,
      );
      throw error;
    }

    let data = {};

    if (!query) {
      const defaultValue = await this.inseeAndIrisService.getInseeAndIrisByCoordinateLocation(
        lat,
        lon,
      );
      data = { ...data, ...defaultValue };
    }

    if (elements.includes('insee-iris')) {
      const inseeAndIris = await this.inseeAndIrisService.getInseeAndIrisByCoordinateLocation(
        lat,
        lon,
      );
      data = { ...data, ...inseeAndIris };
    }

    if (elements.includes('drought-risk')) {
      const droughtRisk = await this.droughtRisk.getDroughtRiskByCoordinateLocation(lat, lon);
      data = { ...data, ...droughtRisk };
    }

    if (elements.includes('buildings-50m')) {
      const builds50 = await this.builds50.getBuildings50mByCoordinateLocation(lat, lon);
      data = { ...data, ...builds50 };
    }

    if (elements.includes('buildings-100m')) {
      const builds100 = await this.builds100.getBuildings100mByCoordinateLocation(lat, lon);
      data = { ...data, ...builds100 };
    }

    if (elements.includes('buildings-200m')) {
      const builds200 = await this.builds200.getBuildings200mByCoordinateLocation(lat, lon);
      data = { ...data, ...builds200 };
    }

    if (elements.includes('buildings-500m')) {
      const builds500 = await this.builds500.getBuildings500mByCoordinateLocation(lat, lon);
      data = { ...data, ...builds500 };
    }

    return h.response(data).code(200);
  }
}
