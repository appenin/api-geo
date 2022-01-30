export interface MultiParams {
  lat: number;
  lon: number;
  IDAddress: string;
  codeInsee: string;
}

export function hasValidMultiParams(params: Record<string, any>): params is MultiParams {
  return (
    'lat' in params &&
    'lon' in params &&
    params.lat >= 41.2 &&
    params.lat <= 51.2 &&
    params.lon >= -5.1 &&
    params.lon <= 9.6 &&
    'IDAddress' in params &&
    'codeInsee' in params &&
    params.codeInsee.length >= 4 &&
    params.codeInsee.length < 6
  );
}
