import { Request, ResponseToolkit } from '@hapi/hapi';

import { IframeWebmapService } from './iframe.service';

export class IframeWebmapController {
  constructor(
    private readonly iframeWebmapService: IframeWebmapService = IframeWebmapService.create(),
  ) {}

  async getIframe(request: Request, h: ResponseToolkit) {
    const { lat, lon, zoom, width, height } = request.params;
    const iframe = await this.iframeWebmapService.getIframe(lat, lon, zoom, width, height);
    return h.response(iframe.iframe).code(200);
  }
}
