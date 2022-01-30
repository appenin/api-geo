import { Request, ResponseToolkit } from '@hapi/hapi';

import { UrlWebmapService } from './url.service';

export class UrlWebMapController {
  constructor(private readonly urlWebmapService: UrlWebmapService) {}

  async getUrl(request: Request, h: ResponseToolkit) {
    const { lat, lon, zoom } = request.params;
    const webMapUrl = await this.urlWebmapService.getUrl(lat, lon, zoom);
    return h.response(webMapUrl.url).type('text/plain');
  }
}
