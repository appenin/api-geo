import { database } from '../../../config/database';
import { SubmersionRiskController } from './marineSubmersion.controller';
import { SubmersionRiskService } from './marineSubmersion.service';

export const submersionRiskService = new SubmersionRiskService(database);
export const submersionRiskController = new SubmersionRiskController(submersionRiskService);
