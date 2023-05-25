import { PresenceOfBalconyService } from './presenceOfBalcony.service';

describe('PresenceOfBalconyService', () => {
  it('Should return presence of balcony for a given IDAddress', async () => {
    // Arrange
    const idAddress = '75107_8909_00020';
    const presenceOfBalconyService = PresenceOfBalconyService.createStubWith({
      ademe_logement_type_avancee_balcon_max: 'PAS_BALCON',
    });

    // Act
    const presenceOfBalcony = await presenceOfBalconyService.getPresenceOfBalconyFromIDAddress(
      idAddress,
    );

    // Assert
    expect(presenceOfBalcony.ademe_logement_type_avancee_balcon_max).toBe('PAS_BALCON');
  });
});
