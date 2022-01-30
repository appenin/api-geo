import { Request, ResponseToolkit } from '@hapi/hapi';

import { HeatingSystemService } from './heatingSystem.service';

export class HeatingSystemController {
  constructor(private readonly heatingSystemService: HeatingSystemService) {}

  async getHeatingSytemFromIDAddress(request: Request, h: ResponseToolkit) {
    const { IDAddress } = request.params;
    const heatingSytem = await this.heatingSystemService.getHeatingSystemFromIDAddress(IDAddress);
    return h.response(heatingSytem).code(200);
  }
}
