import { ZspController } from './zsp.controller';
import { ZspService } from './zsp.service';

export const zspService = ZspService.create();
export const zspController = new ZspController(zspService);
