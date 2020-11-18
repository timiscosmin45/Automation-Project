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
    orgChartLegend: () => selectors.testId(''),
    orgChartLegendStatusName: () => `${selectors.projectDetails.projectDetails.orgChartLegend()} to be completed...`,
    breadcrumb: {
      projectOverview: () => `main button${selectors.child(1)}`,
      projectDetails: () => `main button${selectors.child(2)}`,
    },
    hierarchy: {
      candidateCard: () => selectors.testId('role_card_content'),
      candidateName: () => `${selectors.projectDetails.hierarchy.candidateCard()} p${selectors.child(1)}`,
      confirmedRole: () =>
        `${selectors.projectDetails.hierarchy.candidateCard()} ${selectors.testId('role_card_confirmed')}`,
      awaitingRole: () =>
        `${selectors.projectDetails.hierarchy.candidateCard()} ${selectors.testId('role_card_unconfirmed')}`,
      unassignedRole: () =>
        `${selectors.projectDetails.hierarchy.candidateCard()} ${selectors.testId('role_card_unassigned')}`,
      removeFromRoleBtn: (option) => selectors.testId(`role_card_${option}_remove_button`),
      confirmToRoleBtn: () => selectors.testId('role_card_unconfirmed_confirm_button'),
      reviewCandidatesBtn: () => selectors.testId('role_card_review_candidates_button'),
      findCandidatesBtn: () => selectors.testId('role_card_find_candidates_button'),
      firstLayer: () => selectors.testId(''),
      secondLayer: () => selectors.testId(''),
      thiredLayer: () => selectors.testId(''),
      fourthLayer: () => selectors.testId(''),
    },
  },
  findCandidates: {
    title: () => selectors.testId('fc_page_title'),
    candidatesListTitle: () => selectors.testId('fc_middle_header_text'),
    selectedRoleName: () => selectors.testId('fc_middle_subheader_text'),
    toast: () => selectors.testId(''),
    filterBtn: () => selectors.testId('candidates_filter_icon_button'),
    filterModal: {
      modal: () => '[role="dialog"]',
      title: () => selectors.testId('candidate_filter_dialog_title'),
      clearBtn: () => selectors.testId('candidate_filter_clear_button'),
      applyBtn: () => selectors.testId('candidate_filter_apply_button'),
      closeBtn: () => selectors.testId('candidate_filter_close_icon'),
      label: () => selectors.testId('candidate_filter_dialog_label'),
      datePicker: () => '[name="demobilisationDate"]',
      minimumGrade: {
        fourCheckbox: () => selectors.testId('candidate_filter_checbox_grade4'),
        fiveCheckbox: () => selectors.testId('candidate_filter_checbox_grade5'),
        sixCheckbox: () => selectors.testId('candidate_filter_checbox_grade6'),
        sevenCheckbox: () => selectors.testId('candidate_filter_checbox_grade7'),
      },
      jobRole: () => '[name="jobRole"]',
      location: () => '[name="region"]',
      dropDownOption: (option) => `[data-value="${option}"]`,
    },
    filterPreview: {
      filterPreviewSection: () => selectors.testId('filter_card_wrapper'),
      title: () => selectors.testId('filter_card_title'),
      removeFilterBtn: () => selectors.testId('filter_card_remove_button'),
      demobilisationDateFilter: () => selectors.testId('filter_card_demobilisation_date'),
      gradeFilter: () => selectors.testId('filter_card_jobgrades'),
      jobRoleFilter: () => selectors.testId('filter_card_jobrole'),
      locationFilter: () => selectors.testId('filter_card_region'),
      noCandidatesMatchMsg: () => selectors.testId(''),
    },
    candidateList: {
      list: () => selectors.testId('fc_middle_wrapper'),
      candidate: () => selectors.testId('candidate_card_wrapper'),
      candidateIcon: () => selectors.testId('candidate_card_avatar'),
      candidateName: () => selectors.testId('candidate_card_name'),
      candidateJobTitle: () => selectors.testId('candidate_card_jobtitle'),
      candidateGrade: () => selectors.testId('candidate_card_grade'),
      candidateHomePostcode: () => selectors.testId('candidate_card_postalcode_text'),
      businessUnit: () => selectors.testId('candidate_card_business_unit_value'),
      keyProject: () => selectors.testId('candidate_card_key_project_value'),
      talentProgramme: () => selectors.testId('candidate_card_talent_programme_value'),
      demobilisationDate: () => selectors.testId('candidate_card_demobilisation_value'),
      addToOptionBtn: () => selectors.testId('candidate_card_footer_add_button'),
      seeDetailsBtn: () => selectors.testId('candidate_card_footer_review_button'),
    },
    shortList: {
      list: () => selectors.testId('fc_shortlist_wrapper'),
      slot: () => `${selectors.findCandidates.shortList.list()} div:not(${selectors.child(1)})`,
      title: () => selectors.testId('fc_shortlist_header_text'),
      labelAndDate: () => selectors.testId('fc_shortlist_header_phase_text'),
      explainerText: () => selectors.testId('fc_shortlist_subheader_text'),
      candidate: () => selectors.testId('candidate_card_content'),
      suggestCandidateBtn: () => selectors.testId('candidate_card_footer_suggest_button'),
      removeFromListBtn: () => selectors.testId('candidate_card_footer_remove_button'),
      reorderList: {
        moveUpBtn: () => selectors.testId('candidate_card_reorder_up'),
        moveDownBtn: () => selectors.testId('candidate_card_reorder_down'),
        label: () => selectors.testId('candidate_card_reprioritise_text'),
      },
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
  sharedComponents: {
    projectDetails: {
      projectName: () => selectors.testId('project_info_card_name_value'),
      clientNameLabel: () => selectors.testId('project_info_card_client_label'),
      clientName: () => selectors.testId('project_info_card_client_value'),
      statusLabel: () => selectors.testId('project_info_card_stage_label'),
      status: () => selectors.testId('stage_info_Live_wrapper'),
      sectoLabel: () => selectors.testId('project_info_card_sector_label'),
      sector: () => selectors.testId('project_info_card_sector_value'),
      value: () => selectors.testId('project_info_card_converted_value'),
      location: () => selectors.testId('project_info_card_location_value'),
    },
    projectStage: {
      projectStageTitle: () => selectors.testId(''),
      defaultCard: () => selectors.testId('project_stage_default'),
      activeCard: () => selectors.testId('project_stage_active'),
      stageName: () => selectors.testId('project_stage_value'),
      stageDates: () => selectors.testId('project_stage_date'),
      stageIcon: () => selectors.testId(''),
    },
  },
};

module.exports = selectors;
