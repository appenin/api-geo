import { database } from '../../../config/database';
import { BuildingHeightController } from './buildingHeight.controller';
import { BuildingHeightService } from './buildingHeight.service';

export const buildingHeightService = new BuildingHeightService(database);
export const buildingHeightController = new BuildingHeightController(buildingHeightService);
