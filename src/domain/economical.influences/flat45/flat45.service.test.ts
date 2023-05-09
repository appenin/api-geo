import { Flat45Service } from './flat45.service';

describe('Flat45Service', () => {
  let service: Flat45Service;
  const lat = 48.85049165036697;
  const lon = 2.308362857670213;

  it('should find number of flat built before 1945 for a given coordinate location', async () => {
    // Given
    service = Flat45Service.createStubWith({
      insee_proportion_residence_principale_appart_avant_1945: 1,
    });

    // When
    const flatBuiltBefore1945 = await service.getFlat45ByCoordinateLocation(lat, lon);

    // Then
    expect(flatBuiltBefore1945.insee_proportion_residence_principale_appart_avant_1945).toBe(1);
  });

  it('should return a null object with an invalide coordinate location', async () => {
    // Given
    service = Flat45Service.createStubWith();

    // When
    const flatBuiltBefore1945 = await service.getFlat45ByCoordinateLocation(lat, lon);

    // Then
    expect(flatBuiltBefore1945.insee_proportion_residence_principale_appart_avant_1945).toBeNull();
  });
});
