import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const multiqueryCriminalityRoute = {
  method: 'GET',
  path: '/criminality/@{lat},{lon}&code_insee:{codeInsee}',
  options: {
    handler: async (request: Request, h: ResponseToolkit) => {
      const multiQuery = h.context.multiQueryAdministrativeController;
      return multiQuery.getData(request, h);
    },
    description:
      "Permet le renvoi d'une ou plusieurs requêtes sur la criminalité à partir des coordonénes ou code insee",
    notes:
      'Permet de renvoyer plusieurs requêtes sous la forme {param1}&{param2}&@{param3}?query={query1},{queryX}',
    tags: ['api', tags.criminality],
    validate: {
      params: Joi.object({
        lat: Joi.number().required(),
        lon: Joi.number().required(),
        codeInsee: Joi.string(),
      }),
      query: Joi.object({
        query: Joi.string(),
      }),
    },
  },
};
