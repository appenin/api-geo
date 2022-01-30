export const maxFloodlevel = (levelFloodRunoffRisk: any, levelSubmersionRisk: any) => {
  if (levelFloodRunoffRisk !== null && levelSubmersionRisk !== null) {
    const { overflow_runoff } = levelFloodRunoffRisk;
    const { marine_submersion } = levelSubmersionRisk;
    const max_flood_risk = Math.max(overflow_runoff, marine_submersion);
    return { max_flood_risk };
  } else if (levelFloodRunoffRisk === null || levelSubmersionRisk === null) {
    if (levelFloodRunoffRisk !== null) {
      const max_flood_risk = levelFloodRunoffRisk;
      return { max_flood_risk };
    } else {
      const max_flood_risk = levelSubmersionRisk;
      return { max_flood_risk };
    }
  } else {
    return { max_flood_risk: null };
  }
};
