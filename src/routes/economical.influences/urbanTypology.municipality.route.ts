import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const urbanTypologyRoute = {
  method: 'GET',
  path: '/economy/urban-typology/{codeInsee}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const ubranTypologyController = h.context.ubranTypologyController;
    return await ubranTypologyController.getUrbanTypologyByCodeInsee(request, h);
  },
  options: {
    description: 'Renvoie une typologie urbaine associée à la commune',
    notes: 'Cette route renvoie une typologie urbaine (code et libellé) associés à une commune',
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
              insee_code_unite_urbaine_typologie_urbaine: Joi.number().example(1),
              insee_unite_urbaine_typologie_urbaine: Joi.string().example('Dense urban'),
            }).label('urban_typology'),
          },
        },
      },
    },
  },
};
