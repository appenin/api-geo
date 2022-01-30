import { database } from '../../../config/database';
import { ClimaticRegionController } from './climaticRegion.controller';
import { ClimaticRegionService } from './climaticRegion.service';

export const climaticRegionService = new ClimaticRegionService(database);
export const climaticRegionController = new ClimaticRegionController(climaticRegionService);
