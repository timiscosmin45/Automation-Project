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
    mapBtn: () => selectors.testId(''),
    timelineBtn: () => selectors.testId(''),
    timelineView: {
      timelineSection: () => selectors.testId(''),
      projects: () => selectors.testId(''),
      projectName: () => selectors.testId(''),
      clientName: () => selectors.testId(''),
      projectValue: () => selectors.testId(''),
      sectorIcon: () => selectors.testId(''),
      projectTimeline: () => selectors.testId(''),
      monthLabel: () => selectors.testId(''),
      startYearLabel: () => selectors.testId(''),
      endYearLabel: () => selectors.testId(''),
    },
    timelineLegend: {
      legendList: () => selectors.testId(''),
      earlyEngagementIcon: () => selectors.testId(''),
      bidIcon: () => selectors.testId(''),
      pcsaIcon: () => selectors.testId(''),
      liveProjectsIcon: () => selectors.testId(''),
      earlyEngagementTitle: () => selectors.testId(''),
      bidTitle: () => selectors.testId(''),
      pcsaTitle: () => selectors.testId(''),
      liveProjectsTitle: () => selectors.testId(''),
      earlyEngagementProjectsNumber: () => selectors.testId(''),
      bidProjectsNumber: () => selectors.testId(''),
      pcsaProjectsNumber: () => selectors.testId(''),
      liveProjectsNumber: () => selectors.testId(''),
    },
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
