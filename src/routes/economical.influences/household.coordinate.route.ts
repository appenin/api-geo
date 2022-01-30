import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const householdRoute = {
  method: 'GET',
  path: '/economy/household-density/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const householdController = h.context.householdController;
    return await householdController.getHouseholdByCoordinateLocation(request, h);
  },
  options: {
    description: 'Renvoie la densité des ménage à la tuile filosofi.',
    notes:
      'Cette route renvoie la densité des ménage à la tuile filosofi selon des coordonnées données',
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
              insee_filosofi_densite_menage_km2: Joi.number().example(4272),
            }).label('houshold_density'),
          },
        },
      },
    },
  },
};
