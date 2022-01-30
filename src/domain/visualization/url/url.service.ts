import { config } from '../../../config';

interface Url {
  url: string;
}

export class UrlWebmapService {
  async getUrl(lat: number, lon: number, zoom: number): Promise<Url> {
    const url = `${config.FALCO_WEBMAP}/#${zoom}/${lat}/${lon}`;
    return { url };
  }
}
