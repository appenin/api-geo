import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const _buildings50mRoute = {
  method: 'GET',
  path: '/buildings-50m/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const buildings50mController = h.context.buildings50mController;
    return await buildings50mController.getBuildings50mByCoordinateLocation(request, h);
  },
  options: {
    description: 'Renvoie le nombre de bâtiment à 50m.',
    notes: 'Cette route renvoie le nombre de bâtiment à 50m selon des coordonnées données',
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
              buildings_density: Joi.number().example(73),
            }).label('buildings_density_50'),
          },
        },
      },
    },
  },
};
