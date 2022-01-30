import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import { tags } from '../../config';

export const electricalConsumptionRoute = {
  method: 'GET',
  path: '/structural-features/electrical-consumption/{IDAddress}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const electricalConsumptionController = h.context.electricalConsumptionController;
    return await electricalConsumptionController.getElectricalConsumptionFromIDAddress(request, h);
  },
  options: {
    description: 'Renvoie la consommation énergétique par bâtiment',
    notes: "Cette route renvoie la consommation éléctrique pour un identifiant d'adresse donné",
    tags: ['api', tags.structuralFeatures],
    validate: {
      params: Joi.object({
        IDAddress: Joi.string().required(),
      }),
    },
    plugins: {
      'hapi-swagger': {
        payloadType: 'form',
        responses: {
          200: {
            description: 'successful operation',
            schema: Joi.object({
              ademe_consommation_electrique_residentiel_par_pdl: Joi.number().example(3925.547),
            }).label('electrical_consumption'),
          },
        },
      },
    },
  },
};
