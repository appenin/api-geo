import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const livingStandardRoute = {
  method: 'GET',
  path: '/economy/living-standard/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const livingStandardController = h.context.livingStandardController;
    return await livingStandardController.getLivingStandardByCoordinateLocation(request, h);
  },
  options: {
    description: 'Renvoie les informations liées au niveau de vie des ménages.',
    notes:
      'Cette route renvoie les inforamtions liées au niveau de vie des ménages selon des coordonnées données',
    tags: ['api', tags.economicalInfluences],
    validate: {
      params: Joi.object({
        lat: Joi.number().required(),
        lon: Joi.number().required(),
      }),
    },
    plugins: {
      'hapi-swagger': {
        payloadType: 'form',
        responses: {
          200: {
            description: 'successful operation',
            schema: Joi.object({
              insee_filosofi_niveaux_de_vie_moyen: Joi.number().example(20941.23),
            }).label('living_standard'),
          },
        },
      },
    },
  },
};
