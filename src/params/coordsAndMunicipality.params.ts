export interface CoordsCodeInsee {
  lat: number;
  lon: number;
  codeInsee: string;
}

export function hasValidCoordsCodeInseeParams(
  params: Record<string, any>,
): params is CoordsCodeInsee {
  return (
    'lat' in params &&
    'lon' in params &&
    params.lat >= 41.2 &&
    params.lat <= 51.2 &&
    params.lon >= -5.1 &&
    params.lon <= 9.6 &&
    'codeInsee' in params &&
    params.codeInsee.length >= 4 &&
    params.codeInsee.length < 6
  );
}
