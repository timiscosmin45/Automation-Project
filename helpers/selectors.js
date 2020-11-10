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
    title: () => 'div > h1',
    mapBtn: () => `[type='button']${selectors.child(2)}`,
    timelineBtn: () => `[type='button']${selectors.child(1)}`,
    leftsideHeader: (screen) => selectors.testId(screen),
    listHeading: (screen) => `${selectors.projectOverview.leftsideHeader(screen)} > p`,
    filterBtn: (screen) => `${selectors.projectOverview.leftsideHeader(screen)} button`,
    searchInput: (screen) => `${selectors.projectOverview.leftsideHeader(screen)} input`,
    searchIcon: (screen) => `${selectors.projectOverview.leftsideHeader(screen)} div${selectors.child(2)} > svg`,
    stageIcons: () => selectors.testId('status-icon'),
    opportunityStage: () => `${selectors.projectOverview.stageIcons()} [id="Rectangle"][fill="#6400FE"]`,
    bidStage: () => `${selectors.projectOverview.stageIcons()} [id="Rectangle"][fill="#FE5000"]`,
    pcsaStage: () => `${selectors.projectOverview.stageIcons()} circle`,
    liveProjectsStage: () => `${selectors.projectOverview.stageIcons()} [id="Rectangle"][fill="#FFCD00"]`,
    timelineView: {
      timelineSection: () => selectors.testId('timeline_body_rightside'),
      projects: () => selectors.testId('timeline_card_wrapper'),
      projectName: () => `${selectors.testId('timeline_card_wrapper')} > div > div > div > div > div`,
      clientName: () => `${selectors.testId('timeline_card_wrapper')} > div > div${selectors.child(2)} h5`,
      projectValue: () => `${selectors.testId('timeline_card_wrapper')} > div > div${selectors.child(2)} > div h5`,
      sectorIcon: () => `${selectors.testId('timeline_card_wrapper')} > div > div > div > div svg`,
      projectTimeline: () => selectors.testId('timeline_graphic_wrapper'),
      monthLabel: () => selectors.testId('timeline_months'),
      leftYearLabel: () => selectors.testId('timeline_header_left_year'),
      rightYearLabel: () => selectors.testId('timeline_header_right_year'),
      leftNavigationArrow: () => selectors.testId('timeline_header_icon_left'),
      rightNavigationArrow: () => selectors.testId('timeline_header_icon_right'),
      calendar: () => selectors.testId(''),
    },
    mapView: {
      map: () => selectors.testId('mapview_map_chart'),
      projects: () => selectors.testId('mapview_card_container'),
      projectName: () => `${selectors.projectOverview.mapView.projects()} > div > div > div > div > div`,
      clientName: () => {
        return `${selectors.projectOverview.mapView.projects()} > div > div${selectors.child(2)} h5${selectors.child(
          1,
        )}`;
      },
      projectValue: () => {
        return `${selectors.projectOverview.mapView.projects()} > div > div${selectors.child(
          2,
        )} > div > div${selectors.child(3)} h5`;
      },
      projectLocation: () => {
        return `${selectors.projectOverview.mapView.projects()} > div > div${selectors.child(
          2,
        )} > div > div${selectors.child(2)} h5`;
      },
      dateLabel: () => {
        return `${selectors.projectOverview.mapView.projects()} > div${selectors.child(2)} p${selectors.child(2)}`;
      },
      locationMarkers: () => selectors.testId('mapview_map_pins'),
      pieChart: () => `${selectors.testId('mapview_piechart_wrapper')} svg`,
      pieChartTotalNumber: () => `${selectors.testId('mapview_piechart_text')} > div${selectors.child(1)}`,
      pieChartTotalText: () => `${selectors.testId('mapview_piechart_text')} > div${selectors.child(2)}`,
    },
    timelineLegend: {
      legendIcon: () => selectors.testId('status_legend_icon'),
      legendTitle: () => selectors.testId('status_legend_title'),
      legendNumber: () => selectors.testId('status_legend_number'),
    },
    filterModal: {
      modal: () => '[role="dialog"]',
      title: () => `${selectors.projectOverview.filterModal.modal()} > div:first-of-type`,
      closeBtn: () => `${selectors.projectOverview.filterModal.modal()} > button`,
      applyBtn: () => `${selectors.projectOverview.filterModal.modal()} > div button${selectors.child(2)}`,
      clearBtn: () => `${selectors.projectOverview.filterModal.modal()} > div button${selectors.child(1)}`,
      opportunityCheckbox: () => `${selectors.projectOverview.filterModal.modal()} [name="earlyEngagement"]`,
      bidCheckbox: () => `${selectors.projectOverview.filterModal.modal()} [name="bid"]`,
      pcsaCheckbox: () => `${selectors.projectOverview.filterModal.modal()} [name="PCSA"]`,
      liveCheckbox: () => `${selectors.projectOverview.filterModal.modal()} [name="live"]`,
      listOption: (option) => `[data-value=${option}]`,
      listOptionValue: (option) => `${selectors.projectOverview.filterModal.modal()} [value=${option}]`,
      businessUnitDropdown: () => `${selectors.projectOverview.filterModal.modal()} [name="businessUnit"]`,
      sectorDropdown: () => `${selectors.projectOverview.filterModal.modal()} [name="sector"]`,
      regionDropdown: () => `${selectors.projectOverview.filterModal.modal()} [name="region"]`,
      minValueInput: () => `${selectors.projectOverview.filterModal.modal()} [name="min"]`,
      maxValueInput: () => `${selectors.projectOverview.filterModal.modal()} [name="max"]`,
    },
    filterPreview: {
      previewSection: () => `${selectors.testId('timeline_header_leftside')} > div${selectors.child(2)}`,
      removeFilterBtn: () => `${selectors.projectOverview.filterPreview.previewSection()} button`,
      filterOption: (option) => selectors.testId(option),
    },
  },
  projectDetails: {
    title: () => 'div > h1',
    page: () => selectors.testId(''),
    projectName: () => selectors.testId(''),
    clientName: () => selectors.testId(''),
    status: () => selectors.testId(''),
    sector: () => selectors.testId(''),
    value: () => selectors.testId(''),
    location: () => selectors.testId(''),
    orgChartLegend: () => selectors.testId(''),
    orgChartLegendStatusName: () => `${selectors.projectDetails.projectDetails.orgChartLegend()} to be completed...`,
    breadcrumb: {
      projectOverview: () => selectors.testId(''),
      projectDetails: () => selectors.testId(''),
    },
    hierarchy: {
      candidateCard: () => selectors.testId('role_card_content'),
      candidateName: () => `${selectors.projectDetails.hierarchy.candidateCard()} p${selectors.child(1)}`,
      confirmedRole: () =>
        `${selectors.projectDetails.hierarchy.candidateCard()} ${selectors.testId('role_card_confirmed')}`,
      awaitingRole: () =>
        `${selectors.projectDetails.hierarchy.candidateCard()} ${selectors.testId('role_card_unconfirmed')}`,
      removeFromRoleBtn: (option) => selectors.testId(`role_card_${option}_remove_button`),
      confirmToRoleBtn: () => selectors.testId('role_card_unconfirmed_confirm_button'),
      reviewCandidatesBtn: () => selectors.testId('role_card_review_candidates_button'),
      firstLayer: () => selectors.testId(''),
      secondLayer: () => selectors.testId(''),
      thiredLayer: () => selectors.testId(''),
      fourthLayer: () => selectors.testId(''),
    },
    projectStage: {
      projectStageTitle: () => selectors.testId(''),
      opportunityCard: () => selectors.testId(''),
      opportunityIcon: () => selectors.testId(''),
      opportunityName: () => selectors.testId(''),
      opportunityDates: () => selectors.testId(''),
      bidCard: () => selectors.testId(''),
      bidName: () => selectors.testId(''),
      bidIcon: () => selectors.testId(''),
      bidDates: () => selectors.testId(''),
      pcsaCard: () => selectors.testId(''),
      pcsaName: () => selectors.testId(''),
      pcsaTitle: () => selectors.testId(''),
      pcsaDates: () => selectors.testId(''),
      liveCard: () => selectors.testId(''),
      liveName: () => selectors.testId(''),
      liveIcon: () => selectors.testId(''),
      liveDates: () => selectors.testId(''),
    },
    findCandidatesBtn: () => selectors.testId(''),
  },
  findCandidates: {
    title: () => selectors.testId(''),
    candidatesListTitle: () => selectors.testId(''),
    selectedRoleName: () => selectors.testId(''),
    toast: () => selectors.testId(''),
    candidateList: {
      list: () => selectors.testId(''),
      candidate: () => selectors.testId(''),
      candidateName: () => selectors.testId(''),
      candidateJobTitle: () => selectors.testId(''),
      candidateGrade: () => selectors.testId(''),
      candidateHomePostcode: () => selectors.testId(''),
      addToOptionBtn: () => selectors.testId(''),
    },
    shortList: {
      slot: () => selectors.testId(''),
      title: () => selectors.testId(''),
      labelAndDate: () => selectors.testId(''),
      explainerText: () => selectors.testId(''),
      candidate: () => selectors.testId(''),
      suggestCandidateBtn: () => selectors.testId(''),
      removeFromListBtn: () => selectors.testId(''),
    },
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
