import { UrlWebMapController } from './url.controller';
import { UrlWebmapService } from './url.service';

export const urlWebmapService = new UrlWebmapService();
export const urlWebmapController = new UrlWebMapController(urlWebmapService);
