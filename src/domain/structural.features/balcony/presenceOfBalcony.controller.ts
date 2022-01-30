import { Request, ResponseToolkit } from '@hapi/hapi';

import { IDAddressRequestParams } from '../../../params/IDAddress.params';
import { PresenceOfBalconyService } from './presenceOfBalcony.service';

export class PresenceOfBalconyController {
  constructor(private readonly presenceOfBalconyService: PresenceOfBalconyService) {}

  async getPresenceOfBalconyFromIDAddress(request: Request, h: ResponseToolkit) {
    const { IDAddress } = request.params as IDAddressRequestParams;
    const presenceOfBalcony = await this.presenceOfBalconyService.getPresenceOfBalconyFromIDAddress(
      IDAddress,
    );
    return h.response(presenceOfBalcony).code(200);
  }
}
