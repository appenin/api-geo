import { InseeAndIrisController } from './inseeAndIris.controller';
import { InseeAndIrisService } from './irisAndInsee.service';

export const inseeAndIrisService = InseeAndIrisService.create();
export const inseeAndIrisController = new InseeAndIrisController();
