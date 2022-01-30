import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const flat45Route = {
  method: 'GET',
  path: '/economy/flat-built-before-1945/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const flat45Controller = h.context.flat45Controller;
    return await flat45Controller.getFlat45ByCoordinateLocation(request, h);
  },
  options: {
    description: 'Renvoi la part des appartements construits avant 1945 dans une tuiles filosofi.',
    notes:
      'Cette route renvoie la part des appartements construits avant 1945 dans une tuiles filosofi selon des coordonnées données',
    tags: ['api', tags.economicalInfluences],
    validate: {
      params: Joi.object({
        lat: Joi.number().required(),
        lon: Joi.number().required(),
      }),
    },
    plugins: {
      'hapi-swagger': {
        payloadType: 'form',
        responses: {
          200: {
            description: 'successful operation',
            schema: Joi.object({
              insee_proportion_residence_principale_appart_avant_1945: Joi.number().example(0.21),
            }).label('flat_1945'),
          },
        },
      },
    },
  },
};
