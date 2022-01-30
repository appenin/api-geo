import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const regionRoute = {
  method: 'GET',
  path: '/administrative/region/{codeInsee}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const regionController = h.context.regionController;
    return await regionController.getRegionByCodeInsee(request, h);
  },
  options: {
    description: 'Renvoie le code et le libellé de la région associée à la commune',
    notes: 'Cette route renvoie le code et le libellé de la région associés à une commune',
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
              code_region: Joi.string().example('84'),
              lib_region: Joi.string().example('Auvergne-Rhône-Alpes'),
            }).label('region'),
          },
        },
      },
    },
  },
};
