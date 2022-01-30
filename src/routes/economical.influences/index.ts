import { flat45Route } from './flat45.coordinate.route';
import { householdRoute } from './household.coordinate.route';
import { livingStandardRoute } from './livingStandard.coordinate.route';
import { multiqueryEconomyRoute } from './multiQuery.economy.route';
import { urbanTypologyRoute } from './urbanTypology.municipality.route';
import { urbanUnitRoute } from './urbanUnit.municipality.route';

export const economicalInfluencesRoute = [
  flat45Route,
  householdRoute,
  livingStandardRoute,
  multiqueryEconomyRoute,
  urbanTypologyRoute,
  urbanUnitRoute,
];
