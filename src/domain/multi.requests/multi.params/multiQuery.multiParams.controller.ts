/* eslint-disable dot-notation */
import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMultiParams } from '../../../params/multi.params';
import { DepartementService } from '../../administrative/departement/departement.service';
import { EpciService } from '../../administrative/epci/epci.service';
import { InseeAndIrisService } from '../../administrative/insee.iris/inseeAndIris.service';
import { RegionService } from '../../administrative/region/region.service';
import { Buildings50mService } from '../../criminality/buidlings.density/50m/buildings50m.service';
import { Buildings100mService } from '../../criminality/buidlings.density/100m/buildings100m.service';
import { Buildings200mService } from '../../criminality/buidlings.density/200m/buildings200m.service';
import { Buildings500mService } from '../../criminality/buidlings.density/500m/buildings500m.service';
import { QpvService } from '../../criminality/qpv.location/qpv.service';
import { RobberyIndexService } from '../../criminality/robberyIndex/robberyIndex.service';
import { ZspDistanceService } from '../../criminality/zsp.distance/zspDistance.service';
import { ZspService } from '../../criminality/zsp.location/zsp.service';
import { Flat45Service } from '../../economical.influences/flat45/flat45.service';
import { HouseholdService } from '../../economical.influences/household.density/household.service';
import { LivingStandardService } from '../../economical.influences/living.standard/livingStandard.service';
import { UrbanTypologyService } from '../../economical.influences/urban.typology/urbanTypology.service';
import { UrbanUnitService } from '../../economical.influences/urban.unit/urbanUnit.service';
import { DroughtRiskService } from '../../natural.risk/drought.risk/droughtRisk.service';
import { ForestFireService } from '../../natural.risk/forest.fire/forestFire.service';
import { SubmersionRiskService } from '../../natural.risk/marine.submersion/marineSubmersion.service';
import { OverflowRunoffRiskService } from '../../natural.risk/overflow.runoff/overflowRunoff.service';
import { FirehouseService } from '../../security/firehouses/firehouse.service';
import { PresenceOfBalconyService } from '../../structural.features/balcony/presenceOfBalcony.service';
import { DistanceToMonumentService } from '../../structural.features/distance.to.monument/distanceToMonument.service';
import { ElectricalConsumptionService } from '../../structural.features/electrical.consumption/electricalConsumption.service';
import { HeatingSystemService } from '../../structural.features/heating.system/heatingSystem.service';
import { BuildingHeightService } from '../../structural.features/height/buildingHeight.service';
import { YearOfConstructionService } from '../../structural.features/year.of.construction/yearOfConstruction.service';
import { ClimaticRegionService } from '../../weather/climatic_region/climaticRegion.service';
import { maxFloodlevel } from '../utils';

const allowedElements = [
  '',
  'buildings-50m',
  'buildings-100m',
  'buildings-200m',
  'buildings-500m',
  'drought-risk',
  'flat-built-before-1945',
  'household-density',
  'insee-iris',
  'epci',
  'departement',
  'region',
  'living-standard',
  'qpv',
  'zsp',
  'zsp-distance',
  'building-height',
  'distance-to-monument',
  'electrical-consumption',
  'heating-system',
  'presence-of-balcony',
  'year-of-construction',
  'firehouses',
  'robbery-index',
  'forest-fire',
  'urban-unit',
  'urban-typology',
  'max-flood-risk',
  'overflow-runoff-risk',
  'submersion-risk',
  'climatic-region',
];

export class MultiQueryMultiParamsController {
  constructor(
    private readonly buildings50mService: Buildings50mService,
    private readonly buildings100mService: Buildings100mService,
    private readonly buildings200mService: Buildings200mService,
    private readonly buildings500mService: Buildings500mService,
    private readonly droughtRiskService: DroughtRiskService,
    private readonly flat45Service: Flat45Service,
    private readonly householdService: HouseholdService,
    private readonly inseeAndIrisService: InseeAndIrisService,
    private readonly epciService: EpciService,
    private readonly departementService: DepartementService,
    private readonly regionService: RegionService,
    private readonly livingStandardService: LivingStandardService,
    private readonly qpvService: QpvService,
    private readonly zspService: ZspService,
    private readonly zspDistanceService: ZspDistanceService,
    private readonly buildingHeightService: BuildingHeightService,
    private readonly distanceToMonumentService: DistanceToMonumentService,
    private readonly electricalConsumptionService: ElectricalConsumptionService,
    private readonly heatingSystemService: HeatingSystemService,
    private readonly presenceOfBalconyService: PresenceOfBalconyService,
    private readonly yearOfConstructionService: YearOfConstructionService,
    private readonly firehouseService: FirehouseService,
    private readonly robberyService: RobberyIndexService,
    private readonly forestFireService: ForestFireService,
    private readonly urbanUnitService: UrbanUnitService,
    private readonly urbanTypologyService: UrbanTypologyService,
    private readonly overflowRunoffRiskService: OverflowRunoffRiskService,
    private readonly submersionRiskService: SubmersionRiskService,
    private readonly climaticRegionService: ClimaticRegionService,
  ) {}

  async getData(request: Request, h: ResponseToolkit) {
    if (!hasValidMultiParams(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326  or code insee is invalid or ID_ban not provided.',
      );
      throw error;
    }
    const { lat, lon, IDAddress, codeInsee } = request.params;
    const { query } = request.query as { query: string };
    const elements = (query ?? '').split(',') as Array<
      | 'buildings-50m'
      | 'buildings-100m'
      | 'buildings-200m'
      | 'buildings-500m'
      | 'drought-risk'
      | 'flat-built-before-1945'
      | 'household-density'
      | 'insee-iris'
      | 'epci'
      | 'departement'
      | 'region'
      | 'living-standard'
      | 'qpv'
      | 'zsp'
      | 'zsp-distance'
      | 'building-height'
      | 'distance-to-monument'
      | 'electrical-consumption'
      | 'heating-system'
      | 'presence-of-balcony'
      | 'year-of-construction'
      | 'firehouses'
      | 'robbery-index'
      | 'forest-fire'
      | 'urban-unit'
      | 'urban-typology'
      | 'max-flood-risk'
      | 'overflow-runoff-risk'
      | 'submersion-risk'
      | 'climatic-region'
    >;

    const invalidElements = elements.filter((elem) => !allowedElements.includes(elem));
    if (invalidElements.length > 0) {
      const error = Boom.badRequest(
        `Invalid parameter(s): ${invalidElements.join(', ')}. Allowed parameters: ${allowedElements
          .filter((v) => v)
          .join(', ')}`,
      );
      throw error;
    }

    let data = {};

    const inseeAndIris = await this.inseeAndIrisService.getInseeAndIrisByCoordinateLocation(
      lat,
      lon,
    );
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
    const droughtRisk = await this.droughtRiskService.getDroughtRiskByCoordinateLocation(lat, lon);
    const flat45 = await this.flat45Service.getFlat45ByCoordinateLocation(lat, lon);
    const household = await this.householdService.getHouseholdByCoordinateLocation(lat, lon);
    const epci = await this.epciService.getEpciByCodeInsee(codeInsee);
    const departement = await this.departementService.getDepartmentByCodeInsee(codeInsee);
    const region = await this.regionService.getRegionByCodeInsee(codeInsee);
    const livingStandard = await this.livingStandardService.getLivingStandardByCoordinateLocation(
      lat,
      lon,
    );
    const qpv = await this.qpvService.getQpvByCoordinateLocation(lat, lon);
    const zsp = await this.zspService.getZspByCoordinateLocation(lat, lon);
    const zspDistance = await this.zspDistanceService.getZspDistanceByCoordinateLocation(lat, lon);
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
    const firehouses = await this.firehouseService.getFirehousesByCodeInsee(codeInsee);
    const robberyIndex = await this.robberyService.getRobberyIndexByCodeInsee(codeInsee);
    const forestFire = await this.forestFireService.getForestFireByCodeInsee(codeInsee);
    const urbanUnit = await this.urbanUnitService.getUrbanUnitByCodeInsee(codeInsee);
    const urbanTypology = await this.urbanTypologyService.getUrbanTypologyByCodeInsee(codeInsee);
    const overflowRunoffRisk =
      await this.overflowRunoffRiskService.getOverflowRunoffRiskByCoordinateLocation(lat, lon);
    const submersionRisk = await this.submersionRiskService.getSubmersionRiskByCoordinateLocation(
      lat,
      lon,
    );
    const serializeMaxFloodObjet = maxFloodlevel(overflowRunoffRisk, submersionRisk);
    const climaticRegion = await this.climaticRegionService.getClimateByCodeInsee(codeInsee);

    if (!query) {
      data = { ...data, ...inseeAndIris };
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
        case 'drought-risk':
          data = { ...data, ...droughtRisk };
          break;
        case 'flat-built-before-1945':
          data = { ...data, ...flat45 };
          break;
        case 'household-density':
          data = { ...data, ...household };
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
        case 'living-standard':
          data = { ...data, ...livingStandard };
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
        case 'firehouses':
          data = { ...data, ...firehouses };
          break;
        case 'robbery-index':
          data = { ...data, ...robberyIndex };
          break;
        case 'forest-fire':
          data = { ...data, ...forestFire };
          break;
        case 'urban-unit':
          data = { ...data, ...urbanUnit };
          break;
        case 'urban-typology':
          data = { ...data, ...urbanTypology };
          break;
        case 'overflow-runoff-risk':
          data = { ...data, ...overflowRunoffRisk };
          break;
        case 'submersion-risk':
          data = { ...data, ...submersionRisk };
          break;
        case 'max-flood-risk':
          data = { ...data, ...serializeMaxFloodObjet };
          break;
        case 'climatic-region':
          data = { ...data, ...climaticRegion };
          break;
        default:
          break;
      }
    });

    return h.response(data).code(200);
  }
}
