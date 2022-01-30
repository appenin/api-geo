export function templateNotes(
  title: string,
  description: string,
  licence: string,
  source: URL,
  produceur: string,
  provider: string,
  lastUpdate: Date,
  transformation,
  modelResponse: string,
) {
  let transformationType: string;
  if (transformation !== false) {
    transformationType = `<b>Transformation apporté</b> : ${new URL(transformation)}`;
  } else {
    transformationType = `<b>Transformation apporté</b> : False`;
  }
  return [
    `<b>Titre</b> : ${title}`,
    `<b>Description</b> : ${description}`,
    `<b>Licence</b> : ${licence}`,
    `<b>Source</b> : ${new URL(source)}`,
    `<b>Producteur</b> : ${produceur}`,
    `<b>Fournisseur</b> : ${provider}`,
    `<b>Millésime</b> : ${new Date(lastUpdate)}`,
    transformationType,
    `<b>Exemple d'appel</b> : ${modelResponse}`,
  ];
}
