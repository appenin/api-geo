import { ClimaticRegionController } from './climaticRegion.controller';
import { ClimaticRegionService } from './climaticRegion.service';

export const climaticRegionService = ClimaticRegionService.create();
export const climaticRegionController = new ClimaticRegionController();
