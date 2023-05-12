import { ForestFireController } from './forestFire.controller';
import { ForestFireService } from './forestFire.service';

export const forestFireService = ForestFireService.create();
export const forestFireController = new ForestFireController();
