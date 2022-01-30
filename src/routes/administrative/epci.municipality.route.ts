import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const epciRoute = {
  method: 'GET',
  path: '/administrative/epci/{codeInsee}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const epciController = h.context.epciController;
    return await epciController.getEpciByCodeInsee(request, h);
  },
  options: {
    description: "Renvoie le code et le libellé de l'epci associée à la commune",
    notes: "Cette route renvoie le code et le libellé de l'epci associés à une commune",
    tags: ['api', tags.administrative],
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
              code_epci: Joi.string().example('200069193'),
              lib_epci: Joi.string().example('CC de la Dombes'),
            }).label('epci'),
          },
        },
      },
    },
  },
};
