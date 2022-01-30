import { database } from '../../../config/database';
import { UrbanUnitController } from './urbanUnit.controller';
import { UrbanUnitService } from './urbanUnit.service';

export const urbanUnitService = new UrbanUnitService(database);
export const urbanUnitController = new UrbanUnitController(urbanUnitService);
