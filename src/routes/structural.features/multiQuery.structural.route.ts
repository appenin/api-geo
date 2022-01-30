import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const multiQueryStructuralRoute = {
  method: 'GET',
  path: '/structural-features/{IDAddress}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const multiQueryStructuralController = h.context.multiQueryStructuralController;
    return await multiQueryStructuralController.getData(request, h);
  },
  options: {
    description:
      "Permet le renvoi d'une ou plusieurs requêtes selon un identifiant d'adresse fourni",
    notes: 'Permet de renvoyer plusieurs requêtes sous la forme {param}?query={query1},{queryX}',
    tags: ['api', tags.structuralFeatures],
    validate: {
      params: Joi.object({
        IDAddress: Joi.string().required(),
      }),
      query: Joi.object({
        query: Joi.string(),
      }),
    },
  },
};
