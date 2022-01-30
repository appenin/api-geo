import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const inseeAndIrisRoute = {
  method: 'GET',
  path: '/administrative/insee-iris/@{lat},{lon}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const inseeAndIrisController = h.context.inseeAndIrisController;
    return await inseeAndIrisController.getInseeAndIrisByCoordinateLocation(request, h);
  },
  options: {
    description: 'Renvoie les informations iris and insee',
    notes: 'Cette route renvoie les inforamtions IRIS et Insee selon des coordonnées données',
    tags: ['api', tags.administrative],
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
              code_insee: Joi.string().example('30003'),
              code_iris: Joi.string().example('300030101'),
              nom_com: Joi.string().example('Aigues-Mortes'),
              nom_iris: Joi.string().example('Centre Ville'),
            }).label('insee_iris'),
          },
        },
      },
    },
  },
};
