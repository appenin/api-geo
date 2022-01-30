import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const distanceToMonumentRoute = {
  method: 'GET',
  path: '/structural-features/distance-to-monument/{IDAddress}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const distanceToMonumentController = h.context.distanceToMonumentController;
    return await distanceToMonumentController.getDistanceToMonumentFromIDAddress(request, h);
  },
  options: {
    description: 'Renvoie la distance du bâtiment au monument historique le plus proche',
    notes:
      "Cette route renvoie la distance du bâtiment au monument historique le plus proche pour un identifiant d'adresse donné",
    tags: ['api', tags.structuralFeatures],
    validate: {
      params: Joi.object({
        IDAddress: Joi.string().required(),
      }),
    },
    plugins: {
      'hapi-swagger': {
        payloadType: 'form',
        responses: {
          200: {
            description: 'successful operation',
            schema: Joi.object({
              merime_distance_monument_historique_500min: Joi.number().example(343),
            }).label('distance'),
          },
        },
      },
    },
  },
};
