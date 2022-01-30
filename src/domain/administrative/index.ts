import { departementController, departementService } from './departement';
import { epciController, epciService } from './epci';
import { inseeAndIrisController, inseeAndIrisService } from './insee.iris';
import { regionController, regionService } from './region';

export const administrativeServices = {
  inseeAndIrisService,
  epciService,
  departementService,
  regionService,
};

export const administrativeControllers = {
  inseeAndIrisController,
  epciController,
  departementController,
  regionController,
};
