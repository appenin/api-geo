import { BuildingHeightService } from './buildingHeight.service';

describe('BuildingHeightService', () => {
  it('Should return building height for a given IDAddress', async () => {
    // Arrange
    const idAddress = '75107_8909_00020';
    const buildingHeightService = BuildingHeightService.createStubWith({
      ign_hauteur_batiment: 27,
    });

    // Act
    const buildingHeight = await buildingHeightService.getBuildingHeightFromIDAddress(idAddress);

    // Assert
    expect(buildingHeight.ign_hauteur_batiment).toBe(27);
  });
});
