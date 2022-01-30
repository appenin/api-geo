import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const _buildings100mRoute = {
  method: 'GET',
  path: '/buildings-100m/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const buildings100mController = h.context.buildings100mController;
    return await buildings100mController.getBuildings100mByCoordinateLocation(request, h);
  },
  options: {
    description: 'Renvoie le nombre de bâtiment à 100m.',
    notes: 'Cette route renvoie le nombre de bâtiment à 100m selon des coordonnées données',
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
              buildings_density: Joi.number().example(224),
            }).label('buildings_density_100'),
          },
        },
      },
    },
  },
};
