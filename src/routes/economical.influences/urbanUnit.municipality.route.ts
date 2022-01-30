import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const urbanUnitRoute = {
  method: 'GET',
  path: '/economy/urban-unit/{codeInsee}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const urbanUnitController = h.context.urbanUnitController;
    return await urbanUnitController.getUrbanUnitByCodeInsee(request, h);
  },
  options: {
    description: 'Renvoie une unite urbaine associée à la commune',
    notes: 'Cette route renvoie une unité urbaine (code et libellé) associés à une commune',
    tags: ['api', tags.economicalInfluences],
    validate: {
      params: Joi.object({
        codeInsee: Joi.string().required(),
      }),
    },
    plugins: {
      'hapi-swagger': {
        payloadType: 'form',
        responses: {
          200: {
            description: 'successful operation',
            schema: Joi.object({
              insee_code_unite_urbaine_statut_urbain: Joi.number().example(1),
              insee_unite_urbaine_statut_urbain: Joi.string().example('City centre'),
            }).label('urban_unit'),
          },
        },
      },
    },
  },
};
