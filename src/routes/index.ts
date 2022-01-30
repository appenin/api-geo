import { administrativeRoute } from './administrative';
import { criminalityRoute } from './criminality';
import { deprecatedRoute } from './deprecated';
import { redirectRoute } from './documentation';
import { economicalInfluencesRoute } from './economical.influences';
import { visualizationRoute } from './map';
import { multiScaleRoute } from './multi.query';
import { naturalRiskRoute } from './natural.risk';
import { probesRoute } from './probes';
import { securityRoute } from './security';
import { structuralFeaturesRoute } from './structural.features';
import { weatherRoute } from './weather';

export const routes = [
  ...administrativeRoute,
  ...criminalityRoute,
  ...economicalInfluencesRoute,
  ...multiScaleRoute,
  ...naturalRiskRoute,
  ...probesRoute,
  ...securityRoute,
  ...structuralFeaturesRoute,
  ...redirectRoute,
  ...weatherRoute,
  ...visualizationRoute,
  ...deprecatedRoute,
];
