import { PresenceOfBalconyController } from './presenceOfBalcony.controller';
import { PresenceOfBalconyService } from './presenceOfBalcony.service';

export const presenceOfBalconyService = PresenceOfBalconyService.create();
export const presenceOfBalconyController = new PresenceOfBalconyController();
