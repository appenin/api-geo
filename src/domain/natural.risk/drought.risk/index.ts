import { database } from '../../../config/database';
import { DroughtRiskController } from './droughtRisk.controller';
import { DroughtRiskService } from './droughtRisk.service';

export const droughtRiskService = new DroughtRiskService(database);
export const droughtRiskController = new DroughtRiskController(droughtRiskService);
