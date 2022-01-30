import { database } from '../../../config/database';
import { EpciController } from './epci.controller';
import { EpciService } from './epci.service';

export const epciService = new EpciService(database);
export const epciController = new EpciController(epciService);
