import { submersionRiskService } from '../marine.submersion';
import { overflowRunoffRiskService } from '../overflow.runoff';
import { MaxFloodRiskController } from './flood.max.controller';

export const maxFloodRiskController = new MaxFloodRiskController(
  overflowRunoffRiskService,
  submersionRiskService,
);
