import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const submersionRiskRoute = {
  method: 'GET',
  path: '/natural_risk/submersion-risk/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const submersionRiskController = h.context.submersionRiskController;
    return await submersionRiskController.getSubmersionRiskByCoordinateLocation(request, h);
  },
  options: {
    description: 'Renvoie les informations liées aux submersions marines',
    notes:
      'Cette route renvoie les inforamtions liées aux aux submersions marines selon des coordonnées données',
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
              submersion_risk: Joi.number().example(2),
            }).label('overflow'),
          },
        },
      },
    },
  },
};
