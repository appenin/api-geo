import { SubmersionRiskController } from './marineSubmersion.controller';
import { SubmersionRiskService } from './marineSubmersion.service';

export const submersionRiskService = SubmersionRiskService.create();
export const submersionRiskController = new SubmersionRiskController();
