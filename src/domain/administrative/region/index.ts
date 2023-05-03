import { RegionController } from './region.controller';
import { RegionService } from './region.service';

export const regionService = RegionService.create();
export const regionController = new RegionController();
