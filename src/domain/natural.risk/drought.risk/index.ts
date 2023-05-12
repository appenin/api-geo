import { DroughtRiskController } from './droughtRisk.controller';
import { DroughtRiskService } from './droughtRisk.service';

export const droughtRiskService = DroughtRiskService.create();
export const droughtRiskController = new DroughtRiskController();
