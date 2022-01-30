import { buildingHeightRoute } from './buildingHeight.address.route';
import { distanceToMonumentRoute } from './distanceToMonument.address.route';
import { electricalConsumptionRoute } from './electricalConsumption.address.route';
import { heatingSystemRoute } from './heatingSystem.address.route';
import { multiQueryStructuralRoute } from './multiQuery.structural.route';
import { presenceOfBalconyRoute } from './presenceOfBalcony.address.route';
import { yearOfConstructionRoute } from './yearOfConstruction.address.route';

export const structuralFeaturesRoute = [
  buildingHeightRoute,
  distanceToMonumentRoute,
  electricalConsumptionRoute,
  heatingSystemRoute,
  multiQueryStructuralRoute,
  presenceOfBalconyRoute,
  yearOfConstructionRoute,
];
