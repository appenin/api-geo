import { administrativeControllers } from './administrative';
import { criminalityControllers } from './criminality';
import { economicalControllers } from './economical.influences';
import { multiQueryControllers } from './multi.requests';
import { naturalRiskController } from './natural.risk';
import { securityControllers } from './security';
import { structuralFeaturesControllers } from './structural.features';
import { webmapVisualizationController } from './visualization';
import { weatherController } from './weather';

export const usecases = {
  ...criminalityControllers,
  ...economicalControllers,
  ...multiQueryControllers,
  ...naturalRiskController,
  ...securityControllers,
  ...structuralFeaturesControllers,
  ...weatherController,
  ...webmapVisualizationController,
  ...administrativeControllers,
};
