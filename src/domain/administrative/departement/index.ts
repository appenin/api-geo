import { DepartementController } from './departement.controller';
import { DepartementService } from './departement.service';

export const departementService = DepartementService.create();
export const departementController = new DepartementController();
