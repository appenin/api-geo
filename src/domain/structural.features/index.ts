import { presenceOfBalconyController, presenceOfBalconyService } from './balcony';
import { distanceToMonumentController, distanceToMonumentService } from './distance.to.monument';
import {
  electricalConsumptionController,
  electricalConsumptionService,
} from './electrical.consumption';
import { heatingSystemController, heatingSystemService } from './heating.system';
import { buildingHeightController, buildingHeightService } from './height';
import { yearOfConstructionController, yearOfConstructionService } from './year.of.construction';

export const structuralFeaturesServices = {
  buildingHeightService,
  distanceToMonumentService,
  electricalConsumptionService,
  heatingSystemService,
  yearOfConstructionService,
  presenceOfBalconyService,
};

export const structuralFeaturesControllers = {
  buildingHeightController,
  distanceToMonumentController,
  electricalConsumptionController,
  heatingSystemController,
  yearOfConstructionController,
  presenceOfBalconyController,
};
