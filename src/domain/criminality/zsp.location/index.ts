import { database } from '../../../config/database';
import { ZspController } from './zsp.controller';
import { ZspService } from './zsp.service';

export const zspService = new ZspService(database);
export const zspController = new ZspController(zspService);
