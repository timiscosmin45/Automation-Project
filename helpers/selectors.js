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
    title: () => '.MuiTypography-root.MuiTypography-h1', // workaround for missing testId 
    mapBtn: () => '.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedSecondary',// workaround for missing testId 
    timelineBtn: () => '.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary',// workaround for missing testId 
    timelineView: {
      timelineSection: () => selectors.testId('timeline_body_rightside'),
      projects: () => selectors.testId('timeline_card_wrapper'),
      projectName: () => '.MuiTypography-root.jss40.MuiTypography-h5',// workaround for missing testId 
      clientName: () => '.MuiTypography-root.jss43.MuiTypography-h5',// workaround for missing testId 
      projectValue: () => '.MuiTypography-root.jss45.MuiTypography-h5',// workaround for missing testId 
      sectorIcon: () => selectors.testId('status-icon'),
      projectTimeline: () => selectors.testId('timeline_graphic_wrapper'),
      monthLabel: () => selectors.testId('timeline_months'),
      leftYearLabel: () => selectors.testId('timeline_header_left_year'),
      rightYearLabel: () => selectors.testId('timeline_header_right_year'),
      leftNavigationArrow: () => selectors.testId('timeline_header_icon_left'),
      rightNavigationArrow: () => selectors.testId('timeline_header_icon_right'),
      calendar: () => selectors.testId(''),
      listHeading: () => '.MuiTypography-root.MuiTypography-h1',// workaround for missing testId 
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
    },
    timelineLegend: {
      legendList: () => selectors.testId(''),
      legendIcon: () => selectors.testId('status_legend_icon'),
      legendTitle: () => selectors.testId('status_legend_title'),
      legendNumber: () => selectors.testId('status_legend_number'),
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
