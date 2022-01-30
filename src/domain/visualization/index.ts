import { iframeWebmapController, iframeWebmapService } from './iframe';
import { urlWebmapController, urlWebmapService } from './url';

export const webmapVisualizationService = { iframeWebmapService, urlWebmapService };

export const webmapVisualizationController = { iframeWebmapController, urlWebmapController };
