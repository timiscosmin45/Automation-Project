const selectors = {
  testId: (id) => {
    return `[data-testid="${id}"]`;
  },
  child: (childNumber) => {
    return `:nth-child(${childNumber})`;
  },
  landingPage: {
    title: () => selectors.testId(''),
  },
  projectOverview: {
    title: () => selectors.testId(''),
  },
  projectDetails: {
    title: () => selectors.testId(''),
  },
  FindCandidates: {
    title: () => selectors.testId(''),
  },
  unassignedPeople: {
    title: () => selectors.testId(''),
  },
  sideMenu: {
    projectOverviewOption: () => selectors.testId(''),
    uassignedPeopleOption: () => selectors.testId(''),
    unassignedRolesOption: () => selectors.testId(''),
    sideMenuBar: () => selectors.testId(''),
  },
};

module.exports = selectors;
