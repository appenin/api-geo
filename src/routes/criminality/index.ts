import { buildings50mRoute } from './buildings50m.coordinate.route';
import { buildings100mRoute } from './buildings100m.coordinate.route';
import { buildings200mRoute } from './buildings200m.coordinate.route';
import { buildings500mRoute } from './buildings500m.coordinate.route';
import { multiqueryCriminalityRoute } from './multiQuery.criminality.route';
import { qpvRoute } from './qpv.coordinate.route';
import { robberyIndexRoute } from './robberyIndex.municipality.route';
import { zspRoute } from './zsp.coordinate.route';
import { zspDistanceRoute } from './zspDistance.coordinate.route';

export const criminalityRoute = [
  buildings50mRoute,
  buildings100mRoute,
  buildings200mRoute,
  buildings500mRoute,
  qpvRoute,
  robberyIndexRoute,
  zspRoute,
  zspDistanceRoute,
  multiqueryCriminalityRoute,
];
