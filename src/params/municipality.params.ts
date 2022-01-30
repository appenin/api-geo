export interface MunicipalityRequestParams {
  codeInsee: string;
}

export function hasValidMunicipalityParams(
  params: Record<string, any>,
): params is MunicipalityRequestParams {
  return 'codeInsee' in params && params.codeInsee.length >= 4 && params.codeInsee.length < 6;
}
