import { droughtRiskController, droughtRiskService } from './drought.risk';
import { maxFloodRiskController } from './flood.max.risk';
import { forestFireController, forestFireService } from './forest.fire';
import { submersionRiskController, submersionRiskService } from './marine.submersion';
import { overflowRunoffRiskController, overflowRunoffRiskService } from './overflow.runoff';

export const naturalRiskServices = {
  droughtRiskService,
  forestFireService,
  submersionRiskService,
  overflowRunoffRiskService,
};

export const naturalRiskController = {
  droughtRiskController,
  forestFireController,
  submersionRiskController,
  overflowRunoffRiskController,
  maxFloodRiskController,
};
