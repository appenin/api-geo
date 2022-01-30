import { database } from '../../../config/database';
import { RobberIndexController } from './robberyIndex.controller';
import { RobberyIndexService } from './robberyIndex.service';

export const robberyService = new RobberyIndexService(database);
export const robberyController = new RobberIndexController(robberyService);
