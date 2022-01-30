import { inseeAndIrisService } from '../../administrative/insee.iris';
import {
  buildings50mService,
  buildings100mService,
  buildings200mService,
  buildings500mService,
} from '../../criminality/buidlings.density';
import { droughtRiskService } from '../../natural.risk/drought.risk';
import { DeprecatedController } from './deprecated.controller';

export const deprecatedController = new DeprecatedController(
  inseeAndIrisService,
  droughtRiskService,
  buildings50mService,
  buildings100mService,
  buildings200mService,
  buildings500mService,
);
