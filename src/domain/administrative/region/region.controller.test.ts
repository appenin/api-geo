import { Request } from '@hapi/hapi';

import { responseToolkitForTest } from '../../../libs/http';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';

describe('RegionController', () => {
  it('should return Region information for a given insee code', async () => {
    // Given
    const codeInsee = '01002';

    const regionService = RegionService.createStubWith({
      code_region: '84',
      lib_region: 'Auvergne-Rhône-Alpes',
    });

    const regionController = new RegionController(regionService);

    const request = { params: { codeInsee } };

    // When
    const { statusCode, source } = await regionController.getRegionByCodeInsee(
      request as unknown as Request,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      code_region: '84',
      lib_region: 'Auvergne-Rhône-Alpes',
    });
  });

  it('should throw an error with invalid insee code', async () => {
    // Given
    const codeInsee = '0000000000000000000000';

    const regionService = RegionService.createStubWith();
    const regionController = new RegionController(regionService);

    const request = { params: { codeInsee } };

    // When
    const promise = regionController.getRegionByCodeInsee(request as any, responseToolkitForTest);

    // Then
    await expect(() => promise).rejects.toThrow('[!] Invalid code Insee provided');
  });
});
