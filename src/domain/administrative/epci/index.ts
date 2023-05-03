import { EpciController } from './epci.controller';
import { EpciService } from './epci.service';

export const epciService = EpciService.create();
export const epciController = new EpciController();
