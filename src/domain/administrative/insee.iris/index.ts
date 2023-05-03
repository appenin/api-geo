import { InseeAndIrisController } from './inseeAndIris.controller';
import { InseeAndIrisService } from './inseeAndIris.service';

export const inseeAndIrisService = InseeAndIrisService.create();
export const inseeAndIrisController = new InseeAndIrisController();
