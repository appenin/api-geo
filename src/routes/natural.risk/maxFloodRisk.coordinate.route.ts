import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const maxFloodRiskRoute = {
  method: 'GET',
  path: '/natural_risk/max-flood-risk/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const maxFloodRiskController = h.context.maxFloodRiskController;
    return await maxFloodRiskController.getMaxFloodRiskByCoordinateLocation(request, h);
  },
  options: {
    description:
      "Renvoie les informations liées à l'intensité maximale des inondations marines et continentales",
    notes:
      "Cette route renvoie les inforamtions liées à l'intensité maximale des inondations marines et continentales selon des coordonnées données",
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
              max_flood_risk: Joi.number().example(2),
            }).label('overflow'),
          },
        },
      },
    },
  },
};
