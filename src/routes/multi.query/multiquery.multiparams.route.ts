import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const multiqueryMultiParamsRoute = {
  method: 'GET',
  path: '/multi-query/codeInsee:{codeInsee}&idBan:{IDAddress}&coords:@{lat},{lon}',
  options: {
    handler: async (request: Request, h: ResponseToolkit) => {
      const multiQueryMultiParamsController = h.context.multiQueryMultiParamsController;
      return multiQueryMultiParamsController.getData(request, h);
    },
    description:
      "Permet le renvoi d'une ou plusieurs requêtes à partir de trois informations spatiales",
    notes:
      'Permet de renvoyer plusieurs requêtes sous la forme {param1}&{param2}&@{param3}?query={query1},{queryX}',
    tags: ['api', tags.multiQuery],
    validate: {
      params: Joi.object({
        codeInsee: Joi.string().required(),
        IDAddress: Joi.string().required(),
        lat: Joi.number().required(),
        lon: Joi.number().required(),
      }),
      query: Joi.object({
        query: Joi.string(),
      }),
    },
  },
};
