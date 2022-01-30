interface CoordinatesRequestParams {
  lat: number;
  lon: number;
}

export function hasValidCoordinates(
  params: Record<string, any>,
): params is CoordinatesRequestParams {
  return (
    'lat' in params &&
    'lon' in params &&
    params.lat >= 41.2 &&
    params.lat <= 51.2 &&
    params.lon >= -5.1 &&
    params.lon <= 9.6
  );
}
