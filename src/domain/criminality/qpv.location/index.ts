import { QpvController } from './qpv.controller';
import { QpvService } from './qpv.service';

export const qpvService = QpvService.create();
export const qpvController = new QpvController();
