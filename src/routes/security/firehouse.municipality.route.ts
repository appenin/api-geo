import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const firehouseRoute = {
  method: 'GET',
  path: '/security/firehouses/{codeInsee}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const firehouseController = h.context.firehouseController;
    return await firehouseController.getFirehousesByCodeInsee(request, h);
  },
  options: {
    description: 'Renvoie le nombre de casernes de pompiers pour une commune',
    notes: 'Cette route renvoie le nombre de casernes de pompiers pour une commune donnée',
    tags: ['api', tags.security],
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
              dggn_nombre_caserne_pompiers_commune: Joi.number().example(1),
            }).label('firehouse'),
          },
        },
      },
    },
  },
};
