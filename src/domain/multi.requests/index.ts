import {
  mulitQueryCriminalityController,
  mulitQuerySecurityController,
  multiQueryAdministrativeController,
  multiQueryEconomicalController,
  multiQueryNaturalRiskController,
  multiQueryStructuralController,
  multiQueryWeatherController,
} from './category';
import { deprecatedController } from './deprecated';
import { multiQueryMultiParamsController } from './multi.params';

export const multiQueryControllers = {
  multiQueryAdministrativeController,
  multiQueryStructuralController,
  mulitQueryCriminalityController,
  multiQueryEconomicalController,
  multiQueryNaturalRiskController,
  mulitQuerySecurityController,
  multiQueryMultiParamsController,
  multiQueryWeatherController,
  deprecatedController,
};
