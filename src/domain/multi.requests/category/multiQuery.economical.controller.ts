import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordsCodeInseeParams } from '../../../params/coordsAndMunicipality.params';
import { Flat45Service } from '../../economical.influences/flat45/flat45.service';
import { HouseholdService } from '../../economical.influences/household.density/household.service';
import { LivingStandardService } from '../../economical.influences/living.standard/livingStandard.service';
import { UrbanTypologyService } from '../../economical.influences/urban.typology/urbanTypology.service';
import { UrbanUnitService } from '../../economical.influences/urban.unit/urbanUnit.service';

export const allowedEconomyElements = [
  '',
  'flat-built-before-1945',
  'household-density',
  'living-standard',
  'urban-unit',
  'urban-typology',
];

export class MultiQueryEconomicalController {
  constructor(
    private readonly flat45Service: Flat45Service,
    private readonly householdService: HouseholdService,
    private readonly livingStandardService: LivingStandardService,
    private readonly urbanUnitService: UrbanUnitService,
    private readonly urbanTypologyService: UrbanTypologyService,
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
      | 'flat-built-before-1945'
      | 'household-density'
      | 'insee-iris'
      | 'living-standard'
      | 'urban-unit'
      | 'urban-typology'
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

    const flat45 = await this.flat45Service.getFlat45ByCoordinateLocation(lat, lon);
    const household = await this.householdService.getHouseholdByCoordinateLocation(lat, lon);
    const livingStandard = await this.livingStandardService.getLivingStandardByCoordinateLocation(
      lat,
      lon,
    );
    const urbanUnit = await this.urbanUnitService.getUrbanUnitByCodeInsee(codeInsee);
    const urbanTypology = await this.urbanTypologyService.getUrbanTypologyByCodeInsee(codeInsee);

    if (!query) {
      data = { ...data, ...flat45 };
    }

    elements.forEach((element) => {
      switch (element) {
        case 'flat-built-before-1945':
          data = { ...data, ...flat45 };
          break;
        case 'household-density':
          data = { ...data, ...household };
          break;
        case 'living-standard':
          data = { ...data, ...livingStandard };
          break;
        case 'urban-unit':
          data = { ...data, ...urbanUnit };
          break;
        case 'urban-typology':
          data = { ...data, ...urbanTypology };
          break;
        default:
          break;
      }
    });

    return h.response(data).code(200);
  }
}
