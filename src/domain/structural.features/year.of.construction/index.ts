import { YearOfConstructionController } from './yearOfConstruction.controller';
import { YearOfConstructionService } from './yearOfConstruction.service';

export const yearOfConstructionService = YearOfConstructionService.create();
export const yearOfConstructionController = new YearOfConstructionController();
