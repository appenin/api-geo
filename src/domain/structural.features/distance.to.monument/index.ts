import { DistanceToMonumentController } from './distanceToMonument.controller';
import { DistanceToMonumentService } from './distanceToMonument.service';

export const distanceToMonumentService = DistanceToMonumentService.create();
export const distanceToMonumentController = new DistanceToMonumentController();
