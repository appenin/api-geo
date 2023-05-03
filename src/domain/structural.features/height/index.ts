import { BuildingHeightController } from './buildingHeight.controller';
import { BuildingHeightService } from './buildingHeight.service';

export const buildingHeightService = BuildingHeightService.create();
export const buildingHeightController = new BuildingHeightController();
