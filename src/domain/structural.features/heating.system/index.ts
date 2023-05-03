import { HeatingSystemController } from './heatingSystem.controller';
import { HeatingSystemService } from './heatingSystem.service';

export const heatingSystemService = HeatingSystemService.create();
export const heatingSystemController = new HeatingSystemController();
