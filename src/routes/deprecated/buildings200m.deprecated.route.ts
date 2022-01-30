import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const _buildings200mRoute = {
  method: 'GET',
  path: '/buildings-200m/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const buildings200mController = h.context.buildings200mController;
    return await buildings200mController.getBuildings200mByCoordinateLocation(request, h);
  },
  options: {
    description: 'Renvoie le nombre de bâtiment à 200m.',
    notes: 'Cette route renvoie le nombre de bâtiment à 200m selon des coordonnées données',
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
              buildings_density: Joi.number().example(700),
            }).label('buildings_density_200'),
          },
        },
      },
    },
  },
};
