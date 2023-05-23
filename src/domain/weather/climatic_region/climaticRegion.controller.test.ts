import { responseToolkitForTest } from '../../../libs/http';
import { ClimaticRegionController } from './climaticRegion.controller';
import { ClimaticRegionService } from './climaticRegion.service';

describe('ClimaticRegionController', () => {
  it('should return Climatic Region type for a given insee code', async () => {
    // Given
    const codeInsee = '01002';

    const climaticRegionService = ClimaticRegionService.createStubWith({
      code_region_climatique: 1,
      type_region_climatique: 'climat de montagne',
    });
    const climaticRegionController = new ClimaticRegionController(climaticRegionService);
    const request = { params: { codeInsee } };
    // When
    const { statusCode, source } = await climaticRegionController.getClimateByCodeInsee(
      request as any,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      code_region_climatique: 1,
      type_region_climatique: 'climat de montagne',
    });
  });
  it('should throw an error with invalid insee code', async () => {
    // Given
    const codeInsee = '0000000000000000000000';
    const climaticRegionService = ClimaticRegionService.createStubWith();
    const climaticRegionController = new ClimaticRegionController(climaticRegionService);
    const request = { params: { codeInsee } };

    // When
    const promise = climaticRegionController.getClimateByCodeInsee(
      request as any,
      responseToolkitForTest,
    );

    // Then
    await expect(() => promise).rejects.toThrow('[!] Invalid code Insee provided');
  });
});
