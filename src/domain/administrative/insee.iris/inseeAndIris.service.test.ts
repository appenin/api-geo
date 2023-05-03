import { InseeAndIrisService } from './inseeAndIris.service';

describe('InseeAndIrisService', () => {
  let service: InseeAndIrisService;
  const lat = 48.85049165036697;
  const lon = 2.308362857670213;

  it('should find insee and iris information for a given coordinate location', async () => {
    // Given
    service = InseeAndIrisService.createStubWith({
      codeInsee: '75107',
      codeIris: '8909',
      municipalityName: 'Paris',
      irisName: null,
    });

    // When
    const inseeAndIris = await service.getInseeAndIrisByCoordinateLocation(lat, lon);

    // Then
    expect(inseeAndIris.codeInsee).toBe('75107');
    expect(inseeAndIris.codeIris).toBe('8909');
    expect(inseeAndIris.municipalityName).toBe('Paris');
    expect(inseeAndIris.irisName).toBeNull();
  });

  it('should return a null object with an invalide coordinate location', async () => {
    // Given
    service = InseeAndIrisService.createStubWith();

    // When
    const inseeAndIris = await service.getInseeAndIrisByCoordinateLocation(lat, lon);

    // Then
    expect(inseeAndIris.codeInsee).toBeNull();
    expect(inseeAndIris.codeIris).toBeNull();
    expect(inseeAndIris.municipalityName).toBeNull();
    expect(inseeAndIris.irisName).toBeNull();
  });
});
