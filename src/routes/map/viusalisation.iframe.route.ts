import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const iframVisualizationRoute = {
  method: 'GET',
  path: `/view/iframe/coords:@{lat},{lon}&zoom:{zoom}&width:{width}&height:{height}`,
  options: {
    description: 'Return application readiness status.',
    notes: [],
    plugins: {
      'hapi-swagger': {},
    },
    tags: ['api', tags.dataVisualization],
    handler: async (request: Request, h: ResponseToolkit) => {
      const iframeWebmapController = h.context.iframeWebmapController;
      return await iframeWebmapController.getIframe(request, h);
    },
    validate: {
      params: Joi.object({
        lat: Joi.number().required(),
        lon: Joi.number().required(),
        zoom: Joi.string().required().default('15'),
        width: Joi.string().required().default('100%'),
        height: Joi.string().required().default('800px'),
      }),
    },
  },
};
