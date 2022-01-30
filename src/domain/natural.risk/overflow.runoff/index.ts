import { database } from '../../../config/database';
import { OverflowRunoffRiskController } from './overflowRunoff.controller';
import { OverflowRunoffRiskService } from './overflowRunoff.service';

export const overflowRunoffRiskService = new OverflowRunoffRiskService(database);
export const overflowRunoffRiskController = new OverflowRunoffRiskController(
  overflowRunoffRiskService,
);
