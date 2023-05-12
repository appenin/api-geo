import { UrbanUnitController } from './urbanUnit.controller';
import { UrbanUnitService } from './urbanUnit.service';

export const urbanUnitService = UrbanUnitService.create();
export const urbanUnitController = new UrbanUnitController();
