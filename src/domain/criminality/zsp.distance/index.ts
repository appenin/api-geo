import { ZspDistanceController } from './zspDistance.controller';
import { ZspDistanceService } from './zspDistance.service';

export const zspDistanceService = ZspDistanceService.create();
export const zspDistanceController = new ZspDistanceController(zspDistanceService);
