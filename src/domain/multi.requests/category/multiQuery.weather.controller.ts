import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMunicipalityParams } from '../../../params/municipality.params';
import { ClimaticRegionService } from '../../weather/climatic_region/climaticRegion.service';

export const allowedWeatherElements = ['', 'climatic-region'];

export class MultiQueryWeatherController {
  constructor(private readonly climaticRegionService: ClimaticRegionService) {}

  async getData(request: Request, h: ResponseToolkit) {
    if (!hasValidMunicipalityParams(request.params)) {
      const error = Boom.badRequest('[!] Invalid code Insee provided.');
      throw error;
    }
    const { codeInsee } = request.params;
    const { query } = request.query as { query: string };
    const elements = (query ?? '').split(',') as Array<'climatic-region'>;

    const invalidElements = elements.filter((elem) => !allowedWeatherElements.includes(elem));
    if (invalidElements.length > 0) {
      const error = Boom.badRequest(
        `Invalid parameter(s): ${invalidElements.join(
          ', ',
        )}. Allowed parameters: ${allowedWeatherElements.join(', ')}`,
      );
      throw error;
    }

    let data = {};
    const climaticRegion = await this.climaticRegionService.getClimateByCodeInsee(codeInsee);

    if (!query) {
      data = { ...data, ...climaticRegion };
    }

    elements.forEach((element) => {
      switch (element) {
        case 'climatic-region':
          data = { ...data, ...climaticRegion };
          break;
        default:
          break;
      }
    });

    return h.response(data).code(200);
  }
}
