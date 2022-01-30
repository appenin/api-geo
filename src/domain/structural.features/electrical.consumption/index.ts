import { ElectricalConsumptionController } from './electricalConsumption.controller';
import { ElectricalConsumptionService } from './electricalConsumption.service';

export const electricalConsumptionService = ElectricalConsumptionService.create();
export const electricalConsumptionController = new ElectricalConsumptionController();
