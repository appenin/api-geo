import { LivingStandardController } from './livingStandard.controller';
import { LivingStandardService } from './livingStandard.service';

export const livingStandardService = LivingStandardService.create();
export const livingStandardController = new LivingStandardController();
