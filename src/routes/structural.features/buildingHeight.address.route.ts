import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const buildingHeightRoute = {
  method: 'GET',
  path: '/structural-features/building-height/{IDAddress}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const buildingHeightController = h.context.buildingHeightController;
    return await buildingHeightController.getBuildingHeightFromIDAddress(request, h);
  },
  options: {
    description: 'Renvoie la hauteur maximale du bâtiment',
    notes:
      "Cette route renvoie la hauteur maximale du bâtiment pour un identifiant d'adresse donné",
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
              ign_hauteur_batiment: Joi.number().example(22),
            }).label('height'),
          },
        },
      },
    },
  },
};
