import { Request } from '@hapi/hapi';

import { responseToolkitForTest } from '../../../libs/http';
import { RobberIndexController } from './robberyIndex.controller';
import { RobberyIndexService } from './robberyIndex.service';

describe('RobberIndexController', () => {
  it('should return robbery index value by insee code', async () => {
    // Given
    const codeInsee = '01002';
    const robberyIndexService = RobberyIndexService.createStubWith({
      minterieur_indicateur_crime_delit_commune_cambriolage_taux_pour_mille: 11.613,
    });
    const robberIndexController = new RobberIndexController(robberyIndexService);
    const request = { params: { codeInsee } };
    // When
    const { statusCode, source } = await robberIndexController.getRobberyIndexByCodeInsee(
      request as unknown as Request,
      responseToolkitForTest,
    );

    // Then
    expect(statusCode).toBe(200);
    expect(source).toStrictEqual({
      minterieur_indicateur_crime_delit_commune_cambriolage_taux_pour_mille: 11.613,
    });
  });

  it('should throw an error with incorrect insee code', async () => {
    // Given
    const codeInsee = '0000000000000000000000';

    const robberyIndexService = RobberyIndexService.createStubWith();
    const robberIndexController = new RobberIndexController(robberyIndexService);
    const request = { params: { codeInsee } };
    // When
    const promise = robberIndexController.getRobberyIndexByCodeInsee(
      request as unknown as Request,
      responseToolkitForTest,
    );
    // Then
    await expect(() => promise).rejects.toThrow('[!] Invalid code Insee provided');
  });
});
