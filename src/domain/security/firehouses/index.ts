import { FirehouseController } from './firehouse.controllers';
import { FirehouseService } from './firehouse.service';

export const firehouseService = FirehouseService.create();
export const firehouseController = new FirehouseController();
