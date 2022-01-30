import { inseeAndIrisRoute } from '../administrative/inseeAndIris.coordinate.route';
import { departementRoute } from './departement.municipality.route';
import { epciRoute } from './epci.municipality.route';
import { multiqueryAdministrativeRoute } from './mulitQuery.administrative.route';
import { regionRoute } from './region.municipality.route';

export const administrativeRoute = [
  inseeAndIrisRoute,
  epciRoute,
  departementRoute,
  regionRoute,
  multiqueryAdministrativeRoute,
];
