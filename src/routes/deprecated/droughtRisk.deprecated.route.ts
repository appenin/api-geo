import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const _droughtRiskRoute = {
  method: 'GET',
  path: '/drought-risk/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const droughtRiskController = h.context.droughtRiskController;
    return await droughtRiskController.getDroughtRiskByCoordinateLocation(request, h);
  },
  options: {
    description: 'Renvoie les informations liés aux retraits-gonflements des argiles',
    notes:
      'Cette route renvoie les inforamtions liées aux retraits-gonflements des argiles selon des coordonnées données',
    tags: ['api', tags.deprecated],
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
              drought_risk: Joi.number().example(2),
            }).label('drought_risk'),
          },
        },
      },
    },
  },
};
