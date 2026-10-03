export const cumulativeGpa = (terms) => {
  const credits = terms.reduce((sum, t) => sum + t.credits, 0);
  if (credits === 0) return 0;
  return terms.reduce((sum, t) => sum + t.sgpa * t.credits, 0) / credits;
};

export const completedCredits = (terms) =>
  terms.reduce((sum, t) => sum + t.credits, 0);
