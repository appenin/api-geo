import { database } from '../../../config/database';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';

export const regionService = new RegionService(database);
export const regionController = new RegionController(regionService);
