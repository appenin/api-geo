import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const overflowRunoffRoute = {
  method: 'GET',
  path: '/natural_risk/overflow-runoff-risk/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const overflowRunoffController = h.context.overflowRunoffRiskController;
    return await overflowRunoffController.getOverflowRunoffRiskByCoordinateLocation(request, h);
  },
  options: {
    description: 'Renvoie les informations liées aux débordements et ruissellement',
    notes:
      'Cette route renvoie les inforamtions liées aux débordements et ruissellement selon des coordonnées données',
    tags: ['api', tags.naturalRisk],
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
              overflow_runoff: Joi.number().example(2),
            }).label('overflow'),
          },
        },
      },
    },
  },
};
