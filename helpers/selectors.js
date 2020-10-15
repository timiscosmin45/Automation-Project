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
    title: () => 'div > h1', // workaround for missing testId
    mapBtn: () => `[type='button']${selectors.child(2)}`, // workaround for missing testId
    timelineBtn: () => `[type='button']${selectors.child(1)}`, // workaround for missing testId
    filterBtn: () => `${selectors.testId('timeline_body_rightside')} button`,
    searchInput: () => '[type="text"]', // workaround for missing testId
    timelineView: {
      timelineSection: () => selectors.testId('timeline_body_rightside'),
      projects: () => selectors.testId('timeline_card_wrapper'),
      projectName: () => `${selectors.testId('timeline_card_wrapper')} > div > div > div > div > div`, // workaround for missing testId
      clientName: () => `${selectors.testId('timeline_card_wrapper')} > div > div${selectors.child(2)} h5`, // workaround for missing testId
      projectValue: () => `${selectors.testId('timeline_card_wrapper')} > div > div${selectors.child(2)} > div h5`, // workaround for missing testId
      sectorIcon: () => `${selectors.testId('timeline_card_wrapper')} > div > div > div > div svg`,
      projectTimeline: () => selectors.testId('timeline_graphic_wrapper'),
      monthLabel: () => selectors.testId('timeline_months'),
      leftYearLabel: () => selectors.testId('timeline_header_left_year'),
      rightYearLabel: () => selectors.testId('timeline_header_right_year'),
      leftNavigationArrow: () => selectors.testId('timeline_header_icon_left'),
      rightNavigationArrow: () => selectors.testId('timeline_header_icon_right'),
      calendar: () => selectors.testId(''),
      listHeading: () => '.MuiTypography-root.jss31.MuiTypography-body1', // workaround for missing testId
    },
    mapView: {
      map: () => selectors.testId(''),
      mapLegend: () => selectors.testId(''),
      projects: () => selectors.testId(''),
      projectName: () => selectors.testId(''),
      clientName: () => selectors.testId(''),
      projectValue: () => selectors.testId(''),
      projectLocation: () => selectors.testId(''),
      dateLabel: () => selectors.testId(''),
      listHeading: () => selectors.testId(''),
      locationMarkers: () => selectors.testId(''),
      pieChart: () => selectors.testId(''),
      pieChartTotalNumber: () => selectors.testId(''),
      pieChartTotalText: () => selectors.testId(''),
    },
    timelineLegend: {
      legendIcon: () => selectors.testId('status_legend_icon'),
      legendTitle: () => selectors.testId('status_legend_title'),
      legendNumber: () => selectors.testId('status_legend_number'),
    },
    filterModal: {
      modal: () => selectors.testId(''),
      title: () => selectors.testId(''),
      closeBtn: () => selectors.testId(''),
      applyBtn: () => selectors.testId(''),
      clearBtn: () => selectors.testId(''),
      earlyEngCheckbox: () => '[name="earlyEngagement"]',
      bidCheckbox: () => '[name="bid"]',
      pcsaEngCheckbox: () => '[name="PCSA"]',
      liveProjectsCheckbox: () => '[name="live"]',
      listOption: (option) => `[data-value=${option}]`,
      listOptionValue: (option) => `[value=${option}]`,
      businessUnitDropdown: () => '[name="businessUnit"]',
      sectorDropdown: () => '[name="sector"]',
      regionDropdown: () => '[name="region"]',
      minValueInput: () => '[name="min"]',
      maxValueInput: () => '[name="max"]',
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
    projectOverviewOption: () => selectors.testId('projects-overview'),
    uassignedPeopleOption: () => selectors.testId('unassigned-people'),
    unassignedRolesOption: () => selectors.testId('unassigned-roles'),
    projectOverviewText: () => `${selectors.sideMenu.projectOverviewOption()} p`,
    uassignedPeopleText: () => `${selectors.sideMenu.unassignedPeople()} p`,
    unassignedRolesText: () => `${selectors.sideMenu.unassignedRolesText()} p`,
    sideMenuBar: () => selectors.testId('side-menu'),
  },
};

module.exports = selectors;
