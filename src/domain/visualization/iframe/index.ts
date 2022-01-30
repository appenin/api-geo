import { IframeWebmapController } from './iframe.controller';
import { IframeWebmapService } from './iframe.service';

export const iframeWebmapService = new IframeWebmapService();
export const iframeWebmapController = new IframeWebmapController(iframeWebmapService);
