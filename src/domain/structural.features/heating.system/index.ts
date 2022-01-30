import { database } from '../../../config/database';
import { HeatingSystemController } from './heatingSystem.controller';
import { HeatingSystemService } from './heatingSystem.service';

export const heatingSystemService = new HeatingSystemService(database);
export const heatingSystemController = new HeatingSystemController(heatingSystemService);
