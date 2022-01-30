import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const zspDistanceRoute = {
  method: 'GET',
  path: '/criminality/zsp-distance/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const zspDistanceController = h.context.zspDistanceController;
    return await zspDistanceController.getZspDistanceByCoordinateLocation(request, h);
  },
  options: {
    description: 'Renvoi la distance à la ZSP la plus proche en km.',
    notes:
      'Cette route renvoie la distance à la ZSP la plus proche en km selon des coordonnées données',
    tags: ['api', tags.criminality],
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
              minterieur_zsp_distance: Joi.number().example(0),
            }).label('distance_in_zsp'),
          },
        },
      },
    },
  },
};
