import { Buildings50mController } from './50m/buildings50m.controller';
import { Buildings50mService } from './50m/buildings50m.service';
import { Buildings100mController } from './100m/buildings100m.controller';
import { Buildings100mService } from './100m/buildings100m.service';
import { Buildings200mController } from './200m/buildings200m.controller';
import { Buildings200mService } from './200m/buildings200m.service';
import { Buildings500mController } from './500m/buildings500m.controller';
import { Buildings500mService } from './500m/buildings500m.service';

export const buildings50mService = Buildings50mService.create();
export const buildings50mController = new Buildings50mController();

export const buildings100mService = Buildings100mService.create();
export const buildings100mController = new Buildings100mController();

export const buildings200mService = Buildings200mService.create();
export const buildings200mController = new Buildings200mController();

export const buildings500mService = Buildings500mService.create();
export const buildings500mController = new Buildings500mController();
