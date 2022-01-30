import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const _multiQueryCoordinateRoute = {
  method: 'GET',
  path: '/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const deprecated = h.context.deprecatedController;
    return await deprecated.getData(request, h);
  },
  options: {
    description: "Permet le renvoi d'une ou plusieurs requêtes selon des coordonnées fournies.",
    notes: 'Permet de renvoyer plusieurs requêtes sous la forme {param}?query={query1},{queryX}',
    tags: ['api', tags.deprecated],
    validate: {
      params: Joi.object({
        lat: Joi.number().required(),
        lon: Joi.number().required(),
      }),
      query: Joi.object({
        query: Joi.string(),
      }),
    },
  },
};
