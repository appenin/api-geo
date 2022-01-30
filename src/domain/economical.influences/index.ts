import { flat45Controller, flat45Service } from './flat45';
import { householdController, householdService } from './household.density';
import { livingStandardController, livingStandardService } from './living.standard';
import { ubranTypologyController, urbanTypologyService } from './urban.typology';
import { urbanUnitController, urbanUnitService } from './urban.unit';

export const economicalServices = {
  livingStandardService,
  householdService,
  flat45Service,
  urbanUnitService,
  urbanTypologyService,
};

export const economicalControllers = {
  livingStandardController,
  householdController,
  flat45Controller,
  urbanUnitController,
  ubranTypologyController,
};
