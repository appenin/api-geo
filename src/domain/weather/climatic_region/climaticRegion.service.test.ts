import { ClimaticRegionService } from './climaticRegion.service';

describe('ClimaticRegionService', () => {
  let service: ClimaticRegionService;

  it('should find climatic region type for a given Insee code', async () => {
    // Given
    service = ClimaticRegionService.createStubWith({
      code_region_climatique: 1,
      type_region_climatique: 'climat de montagne',
    });

    // When
    const climaticRegion = await service.getClimateByCodeInsee('01002');

    // Then
    expect(climaticRegion.code_region_climatique).toBe(1);
    expect(climaticRegion.type_region_climatique).toBe('climat de montagne');
  });

  it('should return a null object with an invalid Insee Code', async () => {
    // Given
    service = ClimaticRegionService.createStubWith();

    // When
    const climaticRegion = await service.getClimateByCodeInsee('0000000000000000000000');

    // Then
    expect(climaticRegion.type_region_climatique).toBeNull();
    expect(climaticRegion.code_region_climatique).toBeNull();
  });
});
