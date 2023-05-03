import { RegionService } from './region.service';

describe('RegionService', () => {
  let service: RegionService;
  it('should return region by insee code', async () => {
    // Given
    service = RegionService.createStubWith({
      code_region: '84',
      lib_region: 'Auvergne-Rhône-Alpes',
    });
    // When
    const region = await service.getRegionByCodeInsee('01001');

    // Then
    expect(region.lib_region).toBe('Auvergne-Rhône-Alpes');
    expect(region.code_region).toBe('84');
  });

  it('should return a null region with incorrect insee code', async () => {
    // Given
    service = RegionService.createStubWith();
    // When
    const region = await service.getRegionByCodeInsee('');
    // Then
    expect(region.lib_region).toBeNull();
    expect(region.code_region).toBeNull();
  });
});
