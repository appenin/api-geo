import { HeatingSystemService } from './heatingSystem.service';

describe('HeatingSystemService', () => {
  it('Should return heating system for a given IDAddress', async () => {
    // Arrange
    const idAddress = '75107_8909_00020';
    const heatingSystemService = HeatingSystemService.createStubWith({
      ademe_logement_type_intallation_chauffage: null,
    });

    // Act
    const heatingSystem = await heatingSystemService.getHeatingSystemFromIDAddress(idAddress);

    // Assert
    expect(heatingSystem.ademe_logement_type_intallation_chauffage).toBeNull();
  });
});
