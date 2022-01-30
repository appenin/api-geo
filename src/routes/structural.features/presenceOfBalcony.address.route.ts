import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const presenceOfBalconyRoute = {
  method: 'GET',
  path: '/structural-features/presence-of-balcony/{IDAddress}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const presenceOfBalconyController = h.context.presenceOfBalconyController;
    return await presenceOfBalconyController.getPresenceOfBalconyFromIDAddress(request, h);
  },
  options: {
    description: 'Renvoie le système de chauffage par bâtiment',
    notes:
      "Cette route renvoie le type de système de chauffage du bâtiment pour un identifiant d'adresse donné",
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
              ademe_logement_type_avancee_balcon_max: Joi.string().example('null'),
            }).label('presence_of_balcony'),
          },
        },
      },
    },
  },
};
