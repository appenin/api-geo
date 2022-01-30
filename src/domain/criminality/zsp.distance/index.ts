import { database } from '../../../config/database';
import { ZspDistanceController } from './zspDistance.controller';
import { ZspDistanceService } from './zspDistance.service';

export const zspDistanceService = new ZspDistanceService(database);
export const zspDistanceController = new ZspDistanceController(zspDistanceService);
