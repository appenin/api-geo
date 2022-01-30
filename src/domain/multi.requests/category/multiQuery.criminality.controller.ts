import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordsCodeInseeParams } from '../../../params/coordsAndMunicipality.params';
import { Buildings50mService } from '../../criminality/buidlings.density/50m/buildings50m.service';
import { Buildings100mService } from '../../criminality/buidlings.density/100m/buildings100m.service';
import { Buildings200mService } from '../../criminality/buidlings.density/200m/buildings200m.service';
import { Buildings500mService } from '../../criminality/buidlings.density/500m/buildings500m.service';
import { QpvService } from '../../criminality/qpv.location/qpv.service';
import { RobberyIndexService } from '../../criminality/robberyIndex/robberyIndex.service';
import { ZspDistanceService } from '../../criminality/zsp.distance/zspDistance.service';
import { ZspService } from '../../criminality/zsp.location/zsp.service';

export const allowedCriminalityElements = [
  '',
  'buildings-50m',
  'buildings-100m',
  'buildings-200m',
  'buildings-500m',
  'qpv',
  'zsp',
  'zsp-distance',
  'robbery-index',
];

export class MultiQueryCriminalityController {
  constructor(
    private readonly buildings50mService: Buildings50mService,
    private readonly buildings100mService: Buildings100mService,
    private readonly buildings200mService: Buildings200mService,
    private readonly buildings500mService: Buildings500mService,
    private readonly qpvService: QpvService,
    private readonly zspService: ZspService,
    private readonly zspDistanceService: ZspDistanceService,
    private readonly robberyService: RobberyIndexService,
  ) {}

  async getData(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordsCodeInseeParams(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326  or code insee is invalid.',
      );
      throw error;
    }
    const { lat, lon, codeInsee } = request.params;
    const { query } = request.query as { query: string };
    const elements = (query ?? '').split(',') as Array<
      | 'buildings-50m'
      | 'buildings-100m'
      | 'buildings-200m'
      | 'buildings-500m'
      | 'qpv'
      | 'zsp'
      | 'zsp-distance'
      | 'robbery-index'
    >;

    const invalidElements = elements.filter((elem) => !allowedCriminalityElements.includes(elem));
    if (invalidElements.length > 0) {
      const error = Boom.badRequest(
        `Invalid parameter(s): ${invalidElements.join(
          ', ',
        )}. Allowed parameters: ${allowedCriminalityElements.join(', ')}`,
      );
      throw error;
    }

    let data = {};

    const building50 = await this.buildings50mService.getBuildings50mByCoordinateLocation(lat, lon);
    const building100 = await this.buildings100mService.getBuildings100mByCoordinateLocation(
      lat,
      lon,
    );
    const building200 = await this.buildings200mService.getBuildings200mByCoordinateLocation(
      lat,
      lon,
    );
    const building500 = await this.buildings500mService.getBuildings500mByCoordinateLocation(
      lat,
      lon,
    );
    const qpv = await this.qpvService.getQpvByCoordinateLocation(lat, lon);
    const zsp = await this.zspService.getZspByCoordinateLocation(lat, lon);
    const zspDistance = await this.zspDistanceService.getZspDistanceByCoordinateLocation(lat, lon);
    const robberyIndex = await this.robberyService.getRobberyIndexByCodeInsee(codeInsee);

    if (!query) {
      const zsp = await this.zspService.getZspByCoordinateLocation(lat, lon);
      data = { ...data, ...zsp };
    }

    elements.forEach((element) => {
      switch (element) {
        case 'buildings-50m':
          data = { ...data, ...building50 };
          break;
        case 'buildings-100m':
          data = { ...data, ...building100 };
          break;
        case 'buildings-200m':
          data = { ...data, ...building200 };
          break;
        case 'buildings-500m':
          data = { ...data, ...building500 };
          break;
        case 'qpv':
          data = { ...data, ...qpv };
          break;
        case 'zsp':
          data = { ...data, ...zsp };
          break;
        case 'zsp-distance':
          data = { ...data, ...zspDistance };
          break;
        case 'robbery-index':
          data = { ...data, ...robberyIndex };
          break;
        default:
          break;
      }
    });

    return h.response(data).code(200);
  }
}
