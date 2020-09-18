const selectors = {
  testId: (id) => {
    return `[data-testid="${id}"]`;
  },
  child: (childNumber) => {
    return `:nth-child(${childNumber})`;
  },
  landingPage: () => {
    // cssSelector
  },
  projectOverview: () => {
    // cssSelector
  },
  projectDetails: () => {
    // cssSelector
  },
  FindCandidates: () => {
    // cssSelector
  },
  unassignedPeople: () => {
    // cssSelector
  },
};

module.exports = selectors;
