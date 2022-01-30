import { database } from '../../../config/database';
import { QpvController } from './qpv.controller';
import { QpvService } from './qpv.service';

export const qpvService = new QpvService(database);
export const qpvController = new QpvController(qpvService);
