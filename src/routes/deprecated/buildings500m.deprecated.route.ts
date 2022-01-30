import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const _buildings500mRoute = {
  method: 'GET',
  path: '/buildings-500m/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const buildings500mController = h.context.buildings500mController;
    return await buildings500mController.getBuildings500mByCoordinateLocation(request, h);
  },
  options: {
    description: 'Renvoie le nombre de bâtiment à 500m.',
    notes: 'Cette route renvoie le nombre de bâtiment à 500m selon des coordonnées données',
    tags: ['api', tags.deprecated],
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
              buildings_density: Joi.number().example(1741),
            }).label('buildings_density_500'),
          },
        },
      },
    },
  },
};
