import { administrativeServices } from '../../administrative';
import { criminalityServices } from '../../criminality';
import { economicalServices } from '../../economical.influences';
import { naturalRiskServices } from '../../natural.risk';
import { securityServices } from '../../security';
import { structuralFeaturesServices } from '../../structural.features';
import { weatherServices } from '../../weather';
import { MultiQueryMultiParamsController } from './multiQuery.multiParams.controller';

export const multiQueryMultiParamsController = new MultiQueryMultiParamsController(
  criminalityServices.buildings50mService,
  criminalityServices.buildings100mService,
  criminalityServices.buildings200mService,
  criminalityServices.buildings500mService,
  naturalRiskServices.droughtRiskService,
  economicalServices.flat45Service,
  economicalServices.householdService,
  administrativeServices.inseeAndIrisService,
  administrativeServices.epciService,
  administrativeServices.departementService,
  administrativeServices.regionService,
  economicalServices.livingStandardService,
  criminalityServices.qpvService,
  criminalityServices.zspService,
  criminalityServices.zspDistanceService,
  structuralFeaturesServices.buildingHeightService,
  structuralFeaturesServices.distanceToMonumentService,
  structuralFeaturesServices.electricalConsumptionService,
  structuralFeaturesServices.heatingSystemService,
  structuralFeaturesServices.presenceOfBalconyService,
  structuralFeaturesServices.yearOfConstructionService,
  securityServices.firehouseService,
  criminalityServices.robberyService,
  naturalRiskServices.forestFireService,
  economicalServices.urbanUnitService,
  economicalServices.urbanTypologyService,
  naturalRiskServices.overflowRunoffRiskService,
  naturalRiskServices.submersionRiskService,
  weatherServices.climaticRegionService,
);
