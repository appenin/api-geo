import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';

import { hasValidMunicipalityParams } from '../../../params/municipality.params';
import { DepartementService } from './departement.service';

export class DepartementController {
  constructor(private readonly departmentService: DepartementService) {}

  async getDepartmentByCodeInsee(request: Request, h: ResponseToolkit) {
    if (!hasValidMunicipalityParams(request.params)) {
      const error = Boom.badRequest('[!] Invalid code Insee provided.');
      throw error;
    }
    const { codeInsee } = request.params;
    const department = await this.departmentService.getDepartmentByCodeInsee(codeInsee);
    return h.response(department).code(200);
  }
}
