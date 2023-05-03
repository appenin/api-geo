import { config } from '../../../config';

interface Iframe {
  iframe: string;
}

export class IframeWebmapService {
  async getIframe(
    lat: number,
    lon: number,
    zoom: number,
    width: number,
    height: number,
  ): Promise<Iframe> {
    const iframe = `<iframe src='${config.FALCO_WEBMAP}/#${zoom}/${lat}/${lon}' width='${width}' height='${height}' />`;
    return { iframe };
  }

  static create() {
    return new IframeWebmapService();
  }
}
