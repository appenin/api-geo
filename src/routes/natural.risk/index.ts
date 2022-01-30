import { droughtRiskRoute } from './droughtRisk.coordinate.route';
import { forestFireRoute } from './forestFire.municipality.route';
import { submersionRiskRoute } from './marineSubmersion.coordinate.route';
import { maxFloodRiskRoute } from './maxFloodRisk.coordinate.route';
import { multiqueryNaturalRiskRoute } from './multiQuery.risk.route';
import { overflowRunoffRoute } from './overflow.coordinate.route';

export const naturalRiskRoute = [
  droughtRiskRoute,
  forestFireRoute,
  multiqueryNaturalRiskRoute,
  overflowRunoffRoute,
  submersionRiskRoute,
  maxFloodRiskRoute,
];
