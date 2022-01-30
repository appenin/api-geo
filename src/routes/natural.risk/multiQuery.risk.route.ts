import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const multiqueryNaturalRiskRoute = {
  method: 'GET',
  path: '/natural_risk/@{lat},{lon}&code_insee:{codeInsee}',
  options: {
    handler: async (request: Request, h: ResponseToolkit) => {
      const multiQuery = h.context.multiQueryNaturalRiskController;
      return multiQuery.getData(request, h);
    },
    description:
      "Permet le renvoi d'une ou plusieurs requêtes sur les risques naturels à partir des coordonénes ou code insee",
    notes:
      'Permet de renvoyer plusieurs requêtes sous la forme {param1}&{param2}&@{param3}?query={query1},{queryX}',
    tags: ['api', tags.naturalRisk],
    validate: {
      params: Joi.object({
        lat: Joi.number().required().default('43.5665322').description('Latitude de la position'),
        lon: Joi.number().required().default('4.1913854').description('Longitude de la position'),
        codeInsee: Joi.string().default('30003').description('Code INSEE de la commune'),
      }),
      query: Joi.object({
        query: Joi.string().example('example query').description('Requête de recherche'),
      })
        .options({ stripUnknown: true })
        .label('Query'),
    },
  },
};
