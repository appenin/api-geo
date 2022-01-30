import { database } from '../../../config/database';
import { HouseholdController } from './household.controller';
import { HouseholdService } from './household.service';

export const householdService = new HouseholdService(database);
export const householdController = new HouseholdController(householdService);
