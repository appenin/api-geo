import bdnb from '../metadata/bdnb.json';
import { templateNotes } from './templateNotes';

export const metadataYearOfConstruction = templateNotes(
  `${bdnb.title} - annee_construction`,
  '(ffo) Année de construction du bâtiment',
  'ouverte',
  new URL('https://www.data.gouv.fr/fr/datasets/r/bf189768-b9ee-4e5d-a01d-dc1a02a5e962'),
  'Centre Scientifique et Technique du Bâtiment (CSTB)',
  "Ministère de l'intérieur",
  new Date(bdnb.last_modified),
  false,
  `https://geo.appenin.fr/address/75107_8909_00021/year-of-construction`,
);

export const metadataDistanceToMonument = templateNotes(
  `${bdnb.title} - distance_batiment_historique_plus_proche`,
  '(mer) Distance au batiment historique le plus proche (si moins de 500m) [m]',
  'ouverte',
  new URL('https://www.data.gouv.fr/fr/datasets/r/bf189768-b9ee-4e5d-a01d-dc1a02a5e962'),
  'Centre Scientifique et Technique du Bâtiment (CSTB)',
  "Ministère de l'intérieur",
  new Date(bdnb.last_modified),
  false,
  `https://geo.appenin.fr/address/75107_8909_00021/distance-to-monument`,
);

export const metadataElectricalConsumption = templateNotes(
  `${bdnb.title} - ch_type_inst`,
  "(dpe) Type d'installation de chauffage",
  'ouverte',
  new URL('https://www.data.gouv.fr/fr/datasets/r/bf189768-b9ee-4e5d-a01d-dc1a02a5e962'),
  'Centre Scientifique et Technique du Bâtiment (CSTB)',
  "Ministère de l'intérieur",
  new Date(bdnb.last_modified),
  false,
  `https://geo.appenin.fr/address/75107_8909_00021/electrical-consumption`,
);

export const metadataHeightOfBuilding = templateNotes(
  `${bdnb.title} - hauteur_mean`,
  '(ign) Hauteur moyenne des bâtiments [m]',
  'ouverte',
  new URL('https://www.data.gouv.fr/fr/datasets/r/bf189768-b9ee-4e5d-a01d-dc1a02a5e962'),
  'Centre Scientifique et Technique du Bâtiment (CSTB)',
  "Ministère de l'intérieur",
  new Date(bdnb.last_modified),
  false,
  `https://geo.appenin.fr/address/75107_8909_00021/building-height}`,
);

export const metadataPresenceOfBalcony = templateNotes(
  `${bdnb.title} - avancee_masque_max`,
  "(dpe) Taille de l'avancée maximale des masques solaires [m]",
  'ouverte',
  new URL('https://www.data.gouv.fr/fr/datasets/r/bf189768-b9ee-4e5d-a01d-dc1a02a5e962'),
  'Centre Scientifique et Technique du Bâtiment (CSTB)',
  "Ministère de l'intérieur",
  new Date(bdnb.last_modified),
  false,
  `https://geo.appenin.fr/address/75107_8909_00021/presence-of-balcony`,
);

export const metadataHeatingSystem = templateNotes(
  `${bdnb.title} - ch_type_inst`,
  "(dpe) Type d'installation de chauffage",
  'ouverte',
  new URL('https://www.data.gouv.fr/fr/datasets/r/bf189768-b9ee-4e5d-a01d-dc1a02a5e962'),
  'Centre Scientifique et Technique du Bâtiment (CSTB)',
  "Ministère de l'intérieur",
  new Date(bdnb.last_modified),
  false,
  `https://geo.appenin.fr/address/75107_8909_00021/heating-system`,
);

export const multipleQueriesAdressNote: any[] = [
  'Allow the call of multiple queries from url params split with comma.',
  'Call begin with /{ID_BAN}?query="query 1","query 2",etc.',
  'Model Example: https://geo.appenin.fr/adresses/75107_8909_00021?query=annee-de-construction,consommation-electrique,distance-aux-monuments,hauteur-du-batiment,presence-de-balcon,systeme-de-chauffage',
];
