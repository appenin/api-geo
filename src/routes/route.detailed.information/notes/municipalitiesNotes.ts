import metaGaspar from '../metadata/gaspar.json';
import metaRobbery from '../metadata/gendarmerie.json';
import metaUrbanTypology from '../metadata/typo_urbaine.json';
import metaUrbanUnit from '../metadata/unite_urbaine.json';
import { templateNotes } from './templateNotes';

export const metadataFirehouse = templateNotes(
  `DGGN - Métropole - Casernes SDIS - 2014`,
  "Localisation des casernes de sapeurs-pompiers (Services Départementaux d'Incendies et de Secours) pour la métropole, fournie par la Direction Générale de la Gendarmerie Nationale",
  'ouverte',
  new URL('https://geo.data.gouv.fr/en/datasets/92bed5aa2ea2016d1464e94b17aadbbef3e1a580'),
  "Services Départementaux d'Incendies et de Secours",
  "Ministère de l'intérieur",
  new Date('24/11/2016'),
  new URL('https://gitlab.com/appenin/falco-geo/-/blob/main/data/casernes_sdis/3_create_var.sql'),
  `https://geo.appenin.fr/municipality/75111/firehouse-count`,
);

export const metadatRobberyIndex = templateNotes(
  `${metaRobbery.title}`,
  `${metaRobbery.description}`,
  'ouverte',
  new URL('https://www.data.gouv.fr/fr/datasets/r/3f51212c-f7d2-4aec-b899-06be6cdd1030'),
  'Service statistique ministériel de la sécurité intérieure (SSMSI)',
  "Ministère de l'intérieur",
  new Date(metaRobbery.last_modified),
  new URL(
    'https://gitlab.com/appenin/falco-geo/-/blob/main/data/crimes_gendarmeries/3_create_var.sql',
  ),
  `https://geo.appenin.fr/municipality/75111/robbery-index`,
);

export const metadatUrbanUnit = templateNotes(
  `${metaUrbanUnit.title}`,
  `${metaUrbanUnit.description}`,
  `${metaUrbanUnit.licence}`,
  new URL(`${metaUrbanUnit.download}`),
  `${metaUrbanUnit.producer}`,
  `${metaUrbanUnit.provider}`,
  new Date(metaUrbanUnit.last_modified),
  new URL('https://gitlab.com/appenin/falco-geo/-/blob/main/data/urban_typology/3_create_var.sql'),
  `https://geo.appenin.fr/municipality/75111/urban-unit`,
);

export const metadatFireForest = templateNotes(
  `${metaGaspar.title}`,
  `${metaGaspar.description}`,
  `ouverte`,
  new URL(
    'https://www.data.gouv.fr/fr/datasets/base-nationale-de-gestion-assistee-des-procedures-administratives-relatives-aux-risques-gaspar/',
  ),
  'GASPAR (DDRM/DICRIM)',
  "Ministère de l'intérieur",
  new Date(metaGaspar.last_modified),
  new URL('https://gitlab.com/appenin/falco-geo/-/blob/main/data/gaspar/3_create_var.sql'),
  `https://geo.appenin.fr/municipality/75111/forest-fire`,
);

export const metadaUrbanTypology = templateNotes(
  `${metaUrbanTypology.title}`,
  `${metaUrbanTypology.description}`,
  `${metaUrbanTypology.licence}`,
  new URL(`${metaUrbanTypology.download}`),
  `${metaUrbanTypology.producer}`,
  `${metaUrbanTypology.provider}`,
  new Date(metaUrbanTypology.last_modified),
  new URL('https://gitlab.com/appenin/falco-geo/-/blob/main/data/urban_typology/3_create_var.sql'),
  `https://geo.appenin.fr/municipality/75111/urban-typology`,
);

export const multipleQueriesMunicipalityNote: any[] = [
  'Allow the call of multiple queries from url params split with comma.',
  'Call begin with /communes/{code_insee}?query="query 1","query 2",etc.',
  'Model Example: https://geo.appenin.fr/communes/75111?query=casernes-par-commune,feu-de-foret,indice-de-cambriolage,typologie-urbaine,unite-urbaine',
];
