import { administrativeServices } from '../../administrative';
import { criminalityServices } from '../../criminality';
import { economicalServices } from '../../economical.influences';
import { naturalRiskServices } from '../../natural.risk';
import { securityServices } from '../../security';
import { structuralFeaturesServices } from '../../structural.features';
import { weatherServices } from '../../weather';
import { MultiQueryStructuralFeaturesController } from './mulitQuery.structuralFeatures.controller';
import { MultiQueryAdministrativeController } from './multiQuery.administrative.controller';
import { MultiQueryCriminalityController } from './multiQuery.criminality.controller';
import { MultiQueryEconomicalController } from './multiQuery.economical.controller';
import { MultiQueryNaturalRiskController } from './multiQuery.naturalRisk.controller';
import { MultiQuerySecurityController } from './multiQuery.security.controller';
import { MultiQueryWeatherController } from './multiQuery.weather.controller';

export const multiQueryAdministrativeController = new MultiQueryAdministrativeController(
  administrativeServices.inseeAndIrisService,
  administrativeServices.epciService,
  administrativeServices.departementService,
  administrativeServices.regionService,
);

export const multiQueryStructuralController = new MultiQueryStructuralFeaturesController(
  structuralFeaturesServices.buildingHeightService,
  structuralFeaturesServices.distanceToMonumentService,
  structuralFeaturesServices.electricalConsumptionService,
  structuralFeaturesServices.heatingSystemService,
  structuralFeaturesServices.presenceOfBalconyService,
  structuralFeaturesServices.yearOfConstructionService,
);

export const mulitQueryCriminalityController = new MultiQueryCriminalityController(
  criminalityServices.buildings50mService,
  criminalityServices.buildings100mService,
  criminalityServices.buildings200mService,
  criminalityServices.buildings500mService,
  criminalityServices.qpvService,
  criminalityServices.zspService,
  criminalityServices.zspDistanceService,
  criminalityServices.robberyService,
);

export const multiQueryEconomicalController = new MultiQueryEconomicalController(
  economicalServices.flat45Service,
  economicalServices.householdService,
  economicalServices.livingStandardService,
  economicalServices.urbanUnitService,
  economicalServices.urbanTypologyService,
);

export const multiQueryNaturalRiskController = new MultiQueryNaturalRiskController(
  naturalRiskServices.droughtRiskService,
  naturalRiskServices.forestFireService,
  naturalRiskServices.overflowRunoffRiskService,
  naturalRiskServices.submersionRiskService,
);

export const mulitQuerySecurityController = new MultiQuerySecurityController(
  securityServices.firehouseService,
);

export const multiQueryWeatherController = new MultiQueryWeatherController(
  weatherServices.climaticRegionService,
);
