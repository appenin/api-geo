import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMunicipalityParams } from '../../../params/municipality.params';
import { FirehouseService } from '../../security/firehouses/firehouse.service';

export const allowedSecurityElements = ['', 'firehouses'];

export class MultiQuerySecurityController {
  constructor(private readonly firehouseService: FirehouseService) {}

  async getData(request: Request, h: ResponseToolkit) {
    if (!hasValidMunicipalityParams(request.params)) {
      const error = Boom.badRequest('[!] Invalid code Insee provided.');
      throw error;
    }
    const { codeInsee } = request.params;
    const { query } = request.query as { query: string };
    const elements = (query ?? '').split(',') as Array<'firehouses'>;

    const invalidElements = elements.filter((elem) => !allowedSecurityElements.includes(elem));
    if (invalidElements.length > 0) {
      const error = Boom.badRequest(
        `Invalid parameter(s): ${invalidElements.join(
          ', ',
        )}. Allowed parameters: ${allowedSecurityElements.join(', ')}`,
      );
      throw error;
    }

    let data = {};
    const firehouses = await this.firehouseService.getFirehousesByCodeInsee(codeInsee);

    if (!query) {
      data = { ...data, ...firehouses };
    }

    elements.forEach((element) => {
      switch (element) {
        case 'firehouses':
          data = { ...data, ...firehouses };
          break;
        default:
          break;
      }
    });

    return h.response(data).code(200);
  }
}
