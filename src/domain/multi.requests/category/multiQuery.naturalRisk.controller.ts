/* eslint-disable dot-notation */
import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidCoordsCodeInseeParams } from '../../../params/coordsAndMunicipality.params';
import { DroughtRiskService } from '../../natural.risk/drought.risk/droughtRisk.service';
import { ForestFireService } from '../../natural.risk/forest.fire/forestFire.service';
import { SubmersionRiskService } from '../../natural.risk/marine.submersion/marineSubmersion.service';
import { OverflowRunoffRiskService } from '../../natural.risk/overflow.runoff/overflowRunoff.service';
import { maxFloodlevel } from '../utils';

export const allowedNaturalRiskElements = [
  '',
  'drought-risk',
  'forest-fire',
  'max-flood-risk',
  'overflow-runoff-risk',
  'submersion-risk',
];

export class MultiQueryNaturalRiskController {
  constructor(
    private readonly droughtRiskService: DroughtRiskService,
    private readonly forestFireService: ForestFireService,
    private readonly overflowRunoffRiskService: OverflowRunoffRiskService,
    private readonly submersionRiskService: SubmersionRiskService,
  ) {}

  async getData(request: Request, h: ResponseToolkit) {
    if (!hasValidCoordsCodeInseeParams(request.params)) {
      const error = Boom.badRequest(
        '[!] Your coordinates are outside the France limits or are not in EPSG:4326 or code insee is invalid.',
      );
      throw error;
    }
    const { lat, lon, codeInsee } = request.params;
    const { query } = request.query as { query: string };
    const elements = (query ?? '').split(',') as Array<
      | 'drought-risk'
      | 'flood-risk'
      | 'forest-fire'
      | 'max-flood-risk'
      | 'overflow-runoff-risk'
      | 'submersion-risk'
    >;

    const invalidElements = elements.filter((elem) => !allowedNaturalRiskElements.includes(elem));
    if (invalidElements.length > 0) {
      const error = Boom.badRequest(
        `Invalid parameter(s): ${invalidElements.join(
          ', ',
        )}. Allowed parameters: ${allowedNaturalRiskElements.join(', ')}`,
      );
      throw error;
    }

    let data = {};

    const droughtRisk = await this.droughtRiskService.getDroughtRiskByCoordinateLocation(lat, lon);
    const forestFire = await this.forestFireService.getForestFireByCodeInsee(codeInsee);
    const overflowRunoffRisk =
      await this.overflowRunoffRiskService.getOverflowRunoffRiskByCoordinateLocation(lat, lon);
    const submersionRisk = await this.submersionRiskService.getSubmersionRiskByCoordinateLocation(
      lat,
      lon,
    );

    const serializeMaxFloodObjet = maxFloodlevel(overflowRunoffRisk, submersionRisk);

    if (!query) {
      data = { ...data, ...droughtRisk };
    }

    elements.forEach((element) => {
      switch (element) {
        case 'drought-risk':
          data = { ...data, ...droughtRisk };
          break;
        case 'forest-fire':
          data = { ...data, ...forestFire };
          break;
        case 'max-flood-risk':
          data = { ...data, ...serializeMaxFloodObjet };
          break;
        case 'overflow-runoff-risk':
          data = { ...data, ...overflowRunoffRisk };
          break;
        case 'submersion-risk':
          data = { ...data, ...submersionRisk };
          break;
        default:
          break;
      }
    });

    return h.response(data).code(200);
  }
}
