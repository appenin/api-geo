import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const zspRoute = {
  method: 'GET',
  path: '/criminality/zsp/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const zspController = h.context.zspController;
    return await zspController.getZspByCoordinateLocation(request, h);
  },
  options: {
    description:
      'Renvoi 1 si la coordonnées est localisé dans une zone de sécurité prioritaire sinon renvoi 0.',
    notes:
      'Cette route renvoie 1 si la coordonnées est localisé dans une zone de sécurité prioritaire sinon renvoi 0 selon des coordonnées données',
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
              minterieur_zsp_presence: Joi.number().example(0),
            }).label('locate_in_zsp'),
          },
        },
      },
    },
  },
};
