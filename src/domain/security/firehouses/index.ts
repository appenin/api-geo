import { database } from '../../../config/database';
import { FirehouseController } from './firehouse.controllers';
import { FirehouseService } from './firehouse.service';

export const firehouseService = new FirehouseService(database);
export const firehouseController = new FirehouseController(firehouseService);
