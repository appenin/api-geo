import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const robberyIndexRoute = {
  method: 'GET',
  path: '/criminality/robbery-index/{codeInsee}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const robberyController = h.context.robberyController;
    return await robberyController.getRobberyIndexByCodeInsee(request, h);
  },
  options: {
    description: 'Renvoie un indice de crambiolage pour une commune',
    notes:
      'Cette route renvoie un indice de cambriage pour mille habitant par pour une commune données',
    tags: ['api', tags.criminality],
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
              minterieur_indicateur_crime_delit_commune_cambriolage_taux_pour_mille:
                Joi.number().example(3.735),
            }).label('robberyIndex'),
          },
        },
      },
    },
  },
};
