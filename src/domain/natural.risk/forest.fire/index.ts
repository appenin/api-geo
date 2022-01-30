import { database } from '../../../config/database';
import { ForestFireController } from './forestFire.controller';
import { ForestFireService } from './forestFire.service';

export const forestFireService = new ForestFireService(database);
export const forestFireController = new ForestFireController(forestFireService);
