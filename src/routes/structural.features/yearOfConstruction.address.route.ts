import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const yearOfConstructionRoute = {
  method: 'GET',
  path: '/structural-features/year-of-construction/{IDAddress}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const yearOfConstructionController = h.context.yearOfConstructionController;
    return await yearOfConstructionController.getYearOfConstructionFromIDAddress(request, h);
  },
  options: {
    description: 'Renvoie la date de construction du bâtiment',
    notes:
      "Cette route renvoie la date de construction du bâtiment pour un identifiant d'adresse donné",
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
              ffo_annee_construction: Joi.string().example('1912'),
            }).label('yearOfConstruction'),
          },
        },
      },
    },
  },
};
