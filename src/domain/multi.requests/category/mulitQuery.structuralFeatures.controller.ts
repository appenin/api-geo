import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { PresenceOfBalconyService } from '../../structural.features/balcony/presenceOfBalcony.service';
import { DistanceToMonumentService } from '../../structural.features/distance.to.monument/distanceToMonument.service';
import { ElectricalConsumptionService } from '../../structural.features/electrical.consumption/electricalConsumption.service';
import { HeatingSystemService } from '../../structural.features/heating.system/heatingSystem.service';
import { BuildingHeightService } from '../../structural.features/height/buildingHeight.service';
import { YearOfConstructionService } from '../../structural.features/year.of.construction/yearOfConstruction.service';

export const allowedInfraElements = [
  '',
  'building-height',
  'distance-to-monument',
  'electrical-consumption',
  'heating-system',
  'presence-of-balcony',
  'year-of-construction',
];

export class MultiQueryStructuralFeaturesController {
  constructor(
    private readonly buildingHeightService: BuildingHeightService,
    private readonly distanceToMonumentService: DistanceToMonumentService,
    private readonly electricalConsumptionService: ElectricalConsumptionService,
    private readonly heatingSystemService: HeatingSystemService,
    private readonly presenceOfBalconyService: PresenceOfBalconyService,
    private readonly yearOfConstructionService: YearOfConstructionService,
  ) {}

  async getData(request: Request, h: ResponseToolkit) {
    const { query } = request.query as { query: string };
    const { IDAddress } = request.params;
    const elements = (query ?? '').split(',') as Array<
      | 'building-height'
      | 'distance-to-monument'
      | 'electrical-consumption'
      | 'heating-system'
      | 'presence-of-balcony'
      | 'year-of-construction'
    >;

    const invalidElements = elements.filter((elem) => !allowedInfraElements.includes(elem));
    if (invalidElements.length > 0) {
      const error = Boom.badRequest(
        `Invalid parameter(s): ${invalidElements.join(
          ', ',
        )}. Allowed parameters: ${allowedInfraElements.join(', ')}`,
      );
      throw error;
    }

    let data = {};

    if (!query) {
      const defaultValue = await this.buildingHeightService.getBuildingHeightFromIDAddress(
        IDAddress,
      );
      data = { ...data, ...defaultValue };
    }

    const buildingHeight = await this.buildingHeightService.getBuildingHeightFromIDAddress(
      IDAddress,
    );
    const distanceToMonument =
      await this.distanceToMonumentService.getDistanceToMonumentFromIDAddress(IDAddress);
    const electricalConsumption =
      await this.electricalConsumptionService.getElectricalConsumptionFromIDAddress(IDAddress);
    const heatingSystem = await this.heatingSystemService.getHeatingSystemFromIDAddress(IDAddress);
    const presenceOfBalcony = await this.presenceOfBalconyService.getPresenceOfBalconyFromIDAddress(
      IDAddress,
    );
    const yearOfConstruction =
      await this.yearOfConstructionService.getYearOfConstructionFromIDAddress(IDAddress);

    elements.forEach((element) => {
      switch (element) {
        case 'building-height':
          data = { ...data, ...buildingHeight };
          break;
        case 'distance-to-monument':
          data = { ...data, ...distanceToMonument };
          break;
        case 'electrical-consumption':
          data = { ...data, ...electricalConsumption };
          break;
        case 'heating-system':
          data = { ...data, ...heatingSystem };
          break;
        case 'presence-of-balcony':
          data = { ...data, ...presenceOfBalcony };
          break;
        case 'year-of-construction':
          data = { ...data, ...yearOfConstruction };
          break;
        default:
          break;
      }
    });

    return h.response(data).code(200);
  }
}
