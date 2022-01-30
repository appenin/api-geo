import { database } from '../../../config/database';
import { UrbanTypologyController } from './urbanTypology.controller';
import { UrbanTypologyService } from './urbanTypology.service';

export const urbanTypologyService = new UrbanTypologyService(database);
export const ubranTypologyController = new UrbanTypologyController(urbanTypologyService);
