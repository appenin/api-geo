import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const climaticRegionRoute = {
  method: 'GET',
  path: '/weather/climatic-region/{codeInsee}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const climaticRegionController = h.context.climaticRegionController;
    return await climaticRegionController.getClimateByCodeInsee(request, h);
  },
  options: {
    description: 'Renvoie le type de climat pour une commune',
    notes: 'Cette route renvoie le type de climat pour une commune donnée',
    tags: ['api', tags.weather],
    validate: {
      params: Joi.object({
        codeInsee: Joi.string().required(),
      }),
    },
    plugins: {
      'hapi-swagger': {
        payloadType: 'form',
        responses: {
          200: {
            description: 'successful operation',
            schema: Joi.object({
              code_region_climatique: Joi.number().example(3),
              type_region_climatique: Joi.string().example('climat océanique dégradé'),
            }).label('climaticRegion'),
          },
        },
      },
    },
  },
};
