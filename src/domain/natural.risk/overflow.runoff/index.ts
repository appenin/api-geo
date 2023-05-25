import { OverflowRunoffRiskController } from './overflowRunoff.controller';
import { OverflowRunoffRiskService } from './overflowRunoff.service';

export const overflowRunoffRiskService = OverflowRunoffRiskService.create();
export const overflowRunoffRiskController = new OverflowRunoffRiskController();
