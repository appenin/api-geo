import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const departementRoute = {
  method: 'GET',
  path: '/administrative/departement/{codeInsee}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const departementController = h.context.departementController;
    return await departementController.getDepartmentByCodeInsee(request, h);
  },
  options: {
    description: 'Renvoie le code et le libellé du département associée à la commune',
    notes: 'Cette route renvoie le code et le libellé du département associés à une commune',
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
              code_departement: Joi.string().example('01'),
              lib_departement: Joi.string().example('Ain'),
            }).label('departement'),
          },
        },
      },
    },
  },
};
