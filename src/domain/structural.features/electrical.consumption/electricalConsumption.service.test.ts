import { ElectricalConsumptionService } from './electricalConsumption.service';

describe('ElectricalConsumptionService', () => {
  let service: ElectricalConsumptionService;
  const idAddressTest: string = '75107_8909_00020';
  const exceptedResult: number = 3925.547;

  describe('getElectricalConsumptionFromIDAddress', () => {
    it('should return the electrical consumption for a given ID address', async () => {
      // Given
      service = ElectricalConsumptionService.createStubWith({
        ademe_consommation_electrique_residentiel_par_pdl: exceptedResult,
      });
      // When
      const result = await service.getElectricalConsumptionFromIDAddress(idAddressTest);
      const electricalConsumption = result.ademe_consommation_electrique_residentiel_par_pdl;
      // Then
      expect(electricalConsumption).toBe(exceptedResult);
    });

    it('should return undefined if no electrical consumption is found for a given ID address', async () => {
      // Given
      service = ElectricalConsumptionService.createStubWith();
      // When
      const result = await service.getElectricalConsumptionFromIDAddress(idAddressTest);
      // Then
      expect(result.ademe_consommation_electrique_residentiel_par_pdl).toBeNull();
    });
  });
});
