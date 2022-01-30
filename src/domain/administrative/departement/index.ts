import { database } from '../../../config/database';
import { DepartementController } from './departement.controller';
import { DepartementService } from './departement.service';

export const departementService = new DepartementService(database);
export const departementController = new DepartementController(departementService);
