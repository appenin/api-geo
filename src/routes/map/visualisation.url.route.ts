import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const urlVisualizationRoute = {
  method: 'GET',
  path: `/view/url/coords:@{lat},{lon}&zoom:{zoom}`,
  options: {
    description: 'Return application readiness status.',
    notes: [],
    plugins: {
      'hapi-swagger': {},
    },
    tags: ['api', tags.dataVisualization],
    handler: async (request: Request, h: ResponseToolkit) => {
      const urlWebmapController = h.context.urlWebmapController;
      return await urlWebmapController.getUrl(request, h);
    },
    validate: {
      params: Joi.object({
        lat: Joi.number().required(),
        lon: Joi.number().required(),
        zoom: Joi.string().required().default('15'),
      }),
    },
  },
};
