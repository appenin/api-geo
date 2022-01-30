import { database } from '../../../config/database';
import { DistanceToMonumentController } from './distanceToMonument.controller';
import { DistanceToMonumentService } from './distanceToMonument.service';

export const distanceToMonumentService = new DistanceToMonumentService(database);
export const distanceToMonumentController = new DistanceToMonumentController(
  distanceToMonumentService,
);
