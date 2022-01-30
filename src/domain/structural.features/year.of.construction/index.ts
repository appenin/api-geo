import { database } from '../../../config/database';
import { YearOfConstructionController } from './yearOfConstruction.controller';
import { YearOfConstructionService } from './yearOfConstruction.service';

export const yearOfConstructionService = new YearOfConstructionService(database);
export const yearOfConstructionController = new YearOfConstructionController(
  yearOfConstructionService,
);
