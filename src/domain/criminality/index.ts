import {
  buildings50mController,
  buildings50mService,
  buildings100mController,
  buildings100mService,
  buildings200mController,
  buildings200mService,
  buildings500mController,
  buildings500mService,
} from './buidlings.density';
import { qpvController, qpvService } from './qpv.location';
import { robberyController, robberyService } from './robberyIndex';
import { zspDistanceController, zspDistanceService } from './zsp.distance';
import { zspController, zspService } from './zsp.location';

export const criminalityServices = {
  qpvService,
  zspService,
  zspDistanceService,
  robberyService,
  buildings50mService,
  buildings100mService,
  buildings200mService,
  buildings500mService,
};

export const criminalityControllers = {
  qpvController,
  zspController,
  zspDistanceController,
  robberyController,
  buildings50mController,
  buildings100mController,
  buildings200mController,
  buildings500mController,
};
