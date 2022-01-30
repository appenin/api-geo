import metaBDTopo from '../metadata/bd_topo.json';
import drought from '../metadata/drougth.json';
import metaFlood from '../metadata/flood_risk_covea.json';
import metaPartBuildingBefore1945 from '../metadata/insee_logement_2018.json';
import metaIris from '../metadata/iris.json';
import metaQpv from '../metadata/qpv.json';
import metaFilosoAppenin from '../metadata/tiles_fisolofi_appenin.json';
import metaZspFile from '../metadata/zsp.json';
import { templateNotes } from './templateNotes';

export const metaIrisGe = templateNotes(
  `${metaIris.title}`,
  `${metaIris.description}`,
  `${metaIris.licence}`,
  new URL(`${metaIris.download}`),
  `${metaIris.producer}`,
  `${metaIris.provider}`,
  new Date(metaIris.last_modified),
  false,
  `https://geo.appenin.fr/coordinate-location/@43.5665322,4.1913854/insee-iris`,
);

export const metaFloodRisk = templateNotes(
  `${metaFlood.title}`,
  `${metaFlood.description}`,
  `${metaFlood.licence}`,
  new URL(`${metaFlood.download}`),
  `${metaFlood.producer}`,
  `${metaFlood.provider}`,
  new Date(metaFlood.last_modified),
  false,
  `https://geo.appenin.fr/coordinate-location/@43.5665322,4.1913854/flood-risk`,
);

export const metaDroughtRisk = templateNotes(
  `${drought.title}`,
  `${drought.description}`,
  `${drought.licence}`,
  new URL(`${drought.download}`),
  `${drought.producer}`,
  `${drought.provider}`,
  new Date(drought.last_modified),
  false,
  `https://geo.appenin.fr/coordinate-location/@43.5665322,4.1913854/drought-risk`,
);

export const metaBuildingsDensity50m = templateNotes(
  `${metaBDTopo.title}`,
  `${metaBDTopo.description}`,
  `${metaBDTopo.licence}`,
  new URL(`${metaBDTopo.download}`),
  `${metaBDTopo.producer}`,
  `${metaBDTopo.provider}`,
  new Date(metaBDTopo.last_modified),
  false,
  `https://geo.appenin.fr/coordinate-location/@43.5665322,4.1913854/buildings-50m`,
);

export const metaBuildingsDensity100m = templateNotes(
  `${metaBDTopo.title}`,
  `${metaBDTopo.description}`,
  `${metaBDTopo.licence}`,
  new URL(`${metaBDTopo.download}`),
  `${metaBDTopo.producer}`,
  `${metaBDTopo.provider}`,
  new Date(metaBDTopo.last_modified),
  false,
  `https://geo.appenin.fr/coordinate-location/@43.5665322,4.1913854/buildings-100m`,
);

export const metaBuildingsDensity200m = templateNotes(
  `${metaBDTopo.title}`,
  `${metaBDTopo.description}`,
  `${metaBDTopo.licence}`,
  new URL(`${metaBDTopo.download}`),
  `${metaBDTopo.producer}`,
  `${metaBDTopo.provider}`,
  new Date(metaBDTopo.last_modified),
  false,
  `https://geo.appenin.fr/coordinate-location/@43.5665322,4.1913854/buildings-200m`,
);

export const metaBuildingsDensity500m = templateNotes(
  `${metaBDTopo.title}`,
  `${metaBDTopo.description}`,
  `${metaBDTopo.licence}`,
  new URL(`${metaBDTopo.download}`),
  `${metaBDTopo.producer}`,
  `${metaBDTopo.provider}`,
  new Date(metaBDTopo.last_modified),
  false,
  `https://geo.appenin.fr/coordinate-location/@43.5665322,4.1913854/buildings-500m`,
);

export const metaFilosofiAppenin = templateNotes(
  `${metaFilosoAppenin.title}`,
  `${metaFilosoAppenin.description}`,
  `${metaFilosoAppenin.licence}`,
  new URL(`${metaFilosoAppenin.download}`),
  `${metaFilosoAppenin.producer}`,
  `${metaFilosoAppenin.provider}`,
  new Date(metaFilosoAppenin.last_modified),
  false,
  `https://geo.appenin.fr/coordinate-location/@43.5665322,4.1913854/living-standard`,
);

export const metaQpvData = templateNotes(
  `: Périmètre contractuel des Quartiers Politique de la Ville`,
  `${metaQpv.data[0].description}`,
  `ouverte`,
  new URL(`https://www.data.gouv.fr/fr/datasets/r/6da6f4de-aed4-4ab7-8ffc-7cb7ba1e6722`),
  `Agence nationale de la cohésion des territoires`,
  `Ministère de l'intérieur`,
  new Date(metaQpv.data[0].last_modified),
  false,
  `https://geo.appenin.fr/coordinate-location/@43.5665322,4.1913854/qpv`,
);

export const metaPartOfBuilding = templateNotes(
  `${metaPartBuildingBefore1945.title}`,
  `${metaPartBuildingBefore1945.description}`,
  `${metaPartBuildingBefore1945.licence}`,
  new URL(`${metaPartBuildingBefore1945.download}`),
  `${metaPartBuildingBefore1945.producer}`,
  `${metaPartBuildingBefore1945.provider}`,
  new Date(metaPartBuildingBefore1945.last_modified),
  new URL('https://gitlab.com/appenin/falco-geo/-/blob/main/data/base_logement/2_create_var.sql'),
  `https://geo.appenin.fr/coordinate-location/@43.5665322,4.1913854/part-of-flat-built-before-1945`,
);

export const metaZsp = templateNotes(
  `${metaZspFile.data[0].title}`,
  `${metaZspFile.data[0].description}`,
  `ouverte`,
  new URL(`https://www.data.gouv.fr/fr/datasets/r/3c6ae4fd-a52f-4453-a4a1-f0e7db228d2f`),
  `Ministère de l'intérieur`,
  `Ministère de l'intérieur`,
  new Date(metaZspFile.data[0].last_modified),
  false,
  `https://geo.appenin.fr/coordinate-location/@43.5665322,4.1913854/zsp`,
);

export const multipleQueries = [
  'Allow the call of multiple queries from url params split with comma.',
  'Call begin with /{coordinates}?query="query 1","query 2",etc.',
  'Model Example: https://geo.appenin.fr/coordonnees/@43.5665322,4.1913854?query=insee-iris,flood-risk,drought-risk,buildings-50m,buildings-100m,buildings-200m,buildings-500m,living-standard,household-density,qpv,zsp,flat-before-1945',
];

export const newMultipleQueriesNote = [
  'Allow the call of multiple queries from url params split with comma.',
  'Call begin with /{coordinates}?query="query 1","query 2",etc.',
  'Model Example: https://geo.appenin.fr/coordonnees/@43.5665322,4.1913854?query=insee-iris,flood-risk,drought-risk,buildings-50m,buildings-100m,buildings-200m,buildings-500m,living-standard,household-density,qpv,zsp,flat-before-1945',
];
