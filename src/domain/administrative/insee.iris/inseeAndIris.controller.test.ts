import { Request } from '@hapi/hapi';

import { responseToolkitForTest } from '../../../libs/http';
import { InseeAndIrisController } from './inseeAndIris.controller';
import { InseeAndIrisService } from './inseeAndIris.service';

describe('InseeAndIrisController', () => {
  it('should return insee and iris information for a given coordinate location', async () => {
    // Given
    const lat = 48.85049165036697;
    const lon = 2.308362857670213;

    const inseeAndIrisService = InseeAndIrisService.createStubWith({
      codeInsee: '75107',
      codeIris: '8909',
      municipalityName: 'Paris',
      irisName: null,
    });
    const inseeAndIrisController = new InseeAndIrisController(inseeAndIrisService);

    const request = { params: { lat, lon } };

    // When
    const { statusCode, source } = await inseeAndIrisController.getInseeAndIrisByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      codeInsee: '75107',
      codeIris: '8909',
      municipalityName: 'Paris',
      irisName: null,
    });
  });

  it('should throw an error when an invalid coordinate location is given', async () => {
    // Given
    const inseeAndIrisService = InseeAndIrisService.createStubWith();
    const lat = 0.0;
    const lon = 10.0;
    const inseeAndIrisController = new InseeAndIrisController(inseeAndIrisService);
    const request = { params: { lat, lon } };

    // When
    const promise = inseeAndIrisController.getInseeAndIrisByCoordinateLocation(
      request as unknown as Request,
      responseToolkitForTest,
    );

    // Then
    await expect(() => promise).rejects.toThrow(
      '[!] Your coordinates are outside the France limits or are not in EPSG:4326',
    );
  });
});
