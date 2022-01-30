import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const forestFireRoute = {
  method: 'GET',
  path: '/natural_risk/forest-fire/{codeInsee}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const forestFireController = h.context.forestFireController;
    return await forestFireController.getForestFireByCodeInsee(request, h);
  },
  options: {
    description: 'Renvoie si oui ou non une commune a subi des feux des forêts',
    notes: 'Cette route renvoie le nombre de casernes de pompiers pour une commune donnée',
    tags: ['api', tags.naturalRisk],
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
              gaspar_feu_foret: Joi.boolean().example(true),
            }).label('forestFire'),
          },
        },
      },
    },
  },
};
