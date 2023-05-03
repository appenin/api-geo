import { Request, ResponseToolkit } from '@hapi/hapi';

import { IframeWebmapController } from './iframe.controller';
import { IframeWebmapService } from './iframe.service';

describe('Iframe Controller', () => {
  it('Should return iframe for a params given', async () => {
    // Arrange
    const lat = 48.856614;
    const lon = 2.3522219;
    const zoom = 15;
    const width = '100%';
    const height = '800px';

    const iframeWebmapService = IframeWebmapService.create();
    const iframeWebmapController = new IframeWebmapController(iframeWebmapService);
    const request = { params: { lat, lon, zoom, width, height } };
    const h = {
      response: (result: any) => ({
        code: (statusCode: number) => ({ statusCode, source: result }),
      }),
    };

    // Act
    const { statusCode, source } = await iframeWebmapController.getIframe(
      request as unknown as Request,
      h as ResponseToolkit,
    );

    // Assert
    expect(statusCode).toBe(200);
    expect(source).toBeDefined();
  });
});
