import { tags } from '../../config';
import { allowedInfraElements } from '../../domain/multi.requests/category/mulitQuery.structuralFeatures.controller';
import { allowedAdministrativeElements } from '../../domain/multi.requests/category/multiQuery.administrative.controller';
import { allowedCriminalityElements } from '../../domain/multi.requests/category/multiQuery.criminality.controller';
import { allowedEconomyElements } from '../../domain/multi.requests/category/multiQuery.economical.controller';
import { allowedNaturalRiskElements } from '../../domain/multi.requests/category/multiQuery.naturalRisk.controller';
import { allowedSecurityElements } from '../../domain/multi.requests/category/multiQuery.security.controller';
import { allowedWeatherElements } from '../../domain/multi.requests/category/multiQuery.weather.controller';

export const infoAvailableQuery = {
  method: 'GET',
  path: `/multi-query/info`,
  options: {
    description: 'Return available query.',
    notes: [],
    plugins: {
      'hapi-swagger': {},
    },
    tags: ['api', tags.multiQuery],
    handler: async function () {
      return {
        administrative: allowedAdministrativeElements,
        criminality: allowedCriminalityElements,
        economy: allowedEconomyElements,
        naturalRisk: allowedNaturalRiskElements,
        security: allowedSecurityElements,
        structuralFeatures: allowedInfraElements,
        weather: allowedWeatherElements,
      };
    },
  },
};
