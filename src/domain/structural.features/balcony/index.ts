import { database } from '../../../config/database';
import { PresenceOfBalconyController } from './presenceOfBalcony.controller';
import { PresenceOfBalconyService } from './presenceOfBalcony.service';

export const presenceOfBalconyService = new PresenceOfBalconyService(database);
export const presenceOfBalconyController = new PresenceOfBalconyController(
  presenceOfBalconyService,
);
