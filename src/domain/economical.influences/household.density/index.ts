import { HouseholdController } from './household.controller';
import { HouseholdService } from './household.service';

export const householdService = HouseholdService.create();
export const householdController = new HouseholdController();
