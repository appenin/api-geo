import { ElectricalConsumptionService } from './electricalConsumption.service';

describe('getElectricalConsumptionFromIDAddress', () => {
  it('should return the electrical consumption for a given ID address', async () => {
    // Arrange
    const idAddressTest = '75107_8909_00020';
    const electricalConsumptionServide = ElectricalConsumptionService.createStubWith({
      ademe_consommation_electrique_residentiel_par_pdl: 3925.547,
    });

    // Act
    const electricalConsumption =
      await electricalConsumptionServide.getElectricalConsumptionFromIDAddress(idAddressTest);

    // Assert
    expect(electricalConsumption.ademe_consommation_electrique_residentiel_par_pdl).toBe(3925.547);
  });
});
