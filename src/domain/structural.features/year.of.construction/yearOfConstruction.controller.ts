import { Request, ResponseToolkit } from '@hapi/hapi';

import { IDAddressRequestParams } from '../../../params/IDAddress.params';
import { YearOfConstructionService } from './yearOfConstruction.service';

export class YearOfConstructionController {
  constructor(
    private readonly yearOfConstructionService: YearOfConstructionService = YearOfConstructionService.create(),
  ) {}

  async getYearOfConstructionFromIDAddress(request: Request, h: ResponseToolkit) {
    const { IDAddress } = request.params as IDAddressRequestParams;
    const yearOfConstruction =
      await this.yearOfConstructionService.getYearOfConstructionFromIDAddress(IDAddress);
    return h.response(yearOfConstruction).code(200);
  }
}
