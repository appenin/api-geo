import { RobberIndexController } from './robberyIndex.controller';
import { RobberyIndexService } from './robberyIndex.service';

export const robberyService = RobberyIndexService.create();
export const robberyController = new RobberIndexController(robberyService);
