import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordsCodeInseeParams } from '../../../params/coordsAndMunicipality.params';
import { DepartementService } from '../../administrative/departement/departement.service';
import { EpciService } from '../../administrative/epci/epci.service';
import { InseeAndIrisService } from '../../administrative/insee.iris/irisAndInsee.service';
import { RegionService } from '../../administrative/region/region.service';

export const allowedAdministrativeElements = ['', 'insee-iris', 'epci', 'departement', 'region'];

export class MultiQueryAdministrativeController {
  constructor(
    private readonly inseeAndIrisService: InseeAndIrisService,
    private readonly epciService: EpciService,
    private readonly departementService: DepartementService,
    private readonly regionService: RegionService,
  ) {}

  async getData(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordsCodeInseeParams(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326 or code insee is invalid.',
      );
      throw error;
    }

    const { lat, lon, codeInsee } = request.params;
    const { query } = request.query as { query: string };
    const elements = (query ?? '').split(',') as Array<
      'insee-iris' | 'epci' | 'departement' | 'region'
    >;

    const invalidElements = elements.filter(
      (elem) => !allowedAdministrativeElements.includes(elem),
    );
    if (invalidElements.length > 0) {
      const error = Boom.badRequest(
        `Invalid parameter(s): ${invalidElements.join(
          ', ',
        )}. Allowed parameters: ${allowedAdministrativeElements.join(', ')}`,
      );
      throw error;
    }

    let data = {};

    const inseeAndIris = await this.inseeAndIrisService.getInseeAndIrisByCoordinateLocation(
      lat,
      lon,
    );
    const epci = await this.epciService.getEpciByCodeInsee(codeInsee);
    const departement = await this.departementService.getDepartmentByCodeInsee(codeInsee);
    const region = await this.regionService.getRegionByCodeInsee(codeInsee);

    if (!query) {
      const defaultValue = await this.inseeAndIrisService.getInseeAndIrisByCoordinateLocation(
        lat,
        lon,
      );
      data = { ...data, ...defaultValue };
    }

    elements.forEach((element) => {
      switch (element) {
        case 'insee-iris':
          data = { ...data, ...inseeAndIris };
          break;
        case 'epci':
          data = { ...data, ...epci };
          break;
        case 'departement':
          data = { ...data, ...departement };
          break;
        case 'region':
          data = { ...data, ...region };
          break;
        default:
          break;
      }
    });

    return h.response(data).code(200);
  }
}
