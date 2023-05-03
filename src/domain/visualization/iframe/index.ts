import { IframeWebmapController } from './iframe.controller';
import { IframeWebmapService } from './iframe.service';

export const iframeWebmapService = IframeWebmapService.create();
export const iframeWebmapController = new IframeWebmapController();
