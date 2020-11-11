const { client } = require('nightwatch-api');
const { Given, When, Then } = require('cucumber');
const { constants, getSelector, getDomData, getDate } = require('../../helpers');
const { expect, assert } = require('chai');
const moment = require('moment');

When(/^user "(sees|clicks)" "(Timeline|Map)" button on the Project Overview screen$/, async (action, button) => {
  const { title } = getSelector.projectOverview;
  let selector;
  switch (button) {
    case 'Map':
      selector = getSelector.projectOverview.mapBtn();
      break;
    case 'Timeline':
      selector = getSelector.projectOverview.timelineBtn();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }

  if (action === 'sees') {
    await client
      .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
      .getText(selector, ({ value }) => assert.equal(button, value));
  } else {
    await client
      .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
      .click(selector)
      .moveToElement(title(), 0, 0);
  }
});

Then(/^user sees a list of LOR Projects on the Project Overview "(Timeline|Map)" screen$/, async (screen) => {
  const selector =
    screen === 'Map'
      ? getSelector.projectOverview.mapView.projects()
      : getSelector.projectOverview.timelineView.projects();

  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  const foundElements = await getDomData.idsFromElements(selector);
  for (const element of foundElements) {
    await client.elementIdDisplayed(element, ({ value }) => {
      assert.ok(value, 'Element is not displayed!');
    });
  }
});

Then(/^user sees "([^"]*)" for each project on Projects Overview timeline screen$/, async (projectData) => {
  const selector = getSelector.projectOverview.timelineView.projects();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  let elementSelector;
  switch (projectData) {
    case 'project name':
      elementSelector = getSelector.projectOverview.timelineView.projectName();
      break;
    case 'project value':
      elementSelector = getSelector.projectOverview.timelineView.projectValue();
      break;
    case 'client name':
      elementSelector = getSelector.projectOverview.timelineView.clientName();
      break;
    case 'sector icon':
      elementSelector = getSelector.projectOverview.timelineView.projectName();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  const founElements = await getDomData.idsFromElements(selector);
  for (const element of founElements) {
    await client.elementIdElement(element, 'css selector', elementSelector, ({ value }) => {
      const elementId = value.ELEMENT;
      assert.isDefined(elementId, `${projectData} not found!`);
    });
  }
});

Then(/^user sees "([^"]*)" for each project on Projects Overview map screen$/, async (projectData) => {
  const selector = getSelector.projectOverview.mapView.projects();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  let elementSelector;
  switch (projectData) {
    case 'project name':
      elementSelector = getSelector.projectOverview.mapView.projectName();
      break;
    case 'project value':
      elementSelector = getSelector.projectOverview.mapView.projectValue();
      break;
    case 'client name':
      elementSelector = getSelector.projectOverview.mapView.clientName();
      break;
    case 'project location':
      elementSelector = getSelector.projectOverview.mapView.projectLocation();
      break;
    case 'date label':
      elementSelector = getSelector.projectOverview.mapView.dateLabel();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  const founElements = await getDomData.idsFromElements(selector);
  for (const element of founElements) {
    await client.elementIdElement(element, 'css selector', elementSelector, ({ value }) => {
      const elementId = value.ELEMENT;
      assert.isDefined(elementId, `${projectData} not found!`);
    });
  }
});

Then(/^user sees the timeline for each project on timeline section$/, async () => {
  const { projects, projectTimeline } = getSelector.projectOverview.timelineView;
  const foundProjects = await getDomData.idsFromElements(projects());
  const foundTimelines = await getDomData.idsFromElements(projectTimeline());
  expect(foundProjects.length).to.equal(foundTimelines.length);
});

Then(/^user sees all the months displayed on timeline section$/, async () => {
  const selector = getSelector.projectOverview.timelineView.monthLabel();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  const foundElements = await getDomData.textFromElements(selector);
  const formattedElements = foundElements[0].replace(/(\r\n|\n|\r)/gm, ' ').split(' ');
  const months = moment.monthsShort();
  expect(formattedElements).to.have.ordered.members(months.concat(months));
});

Then(/^user sees "(left|right)" label date as "([^"]*)" displayed on timeline section$/, async (label, yearText) => {
  const { leftYearLabel, rightYearLabel } = getSelector.projectOverview.timelineView;
  const selector = label === 'left' ? leftYearLabel() : rightYearLabel();
  const expectedYear = getDate.getYear(yearText);
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  await client.getText(selector, ({ value }) => assert.equal(value, expectedYear));
});

Given(/^user sees the timeline section on Projects Overview timeline screen$/, async () => {
  const selector = getSelector.projectOverview.timelineView.timelineSection();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
});

Then(/^user sees a legend with "([^"]*)" status, its respective icon and the number of projects$/, async (status) => {
  const { legendIcon, legendTitle, legendNumber } = getSelector.projectOverview.timelineLegend;

  const projectIcon = await getDomData.idsFromElements(legendIcon());
  const projectTitle = await getDomData.textFromElements(legendTitle());
  const projectNumber = await getDomData.idsFromElements(legendNumber());

  expect(projectIcon).to.have.length(projectTitle.length);
  expect(projectNumber).to.have.length(projectTitle.length);
  expect(projectTitle).to.include(status);
});

Then(/^user sees toggle showing the "(Timeline|Map)" option highlighted$/, async (screen) => {
  const btnMap = getSelector.projectOverview.mapBtn();
  const btnTimeline = getSelector.projectOverview.timelineBtn();
  const { MAP_TIMELINE, HIGHLIGHTED_BUTTON } = constants.DESIGN_COLORS.BUTTONS;

  if (screen === 'Timeline') {
    await client.assert.cssProperty(btnMap, 'background-color', MAP_TIMELINE);
    await client.assert.cssProperty(btnTimeline, 'background-color', HIGHLIGHTED_BUTTON);
  } else {
    await client.assert.cssProperty(btnMap, 'background-color', HIGHLIGHTED_BUTTON);
    await client.assert.cssProperty(btnTimeline, 'background-color', MAP_TIMELINE);
  }
});

When(/^user clicks on the "(left|right)" navigation arrow on timeline section$/, async (arrow) => {
  const { leftNavigationArrow, rightNavigationArrow } = getSelector.projectOverview.timelineView;
  const selector = arrow === 'left' ? leftNavigationArrow() : rightNavigationArrow();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).click(selector);
});

Then(
  /^user sees "([^"]*)" text as the list heading on Project Overview "(Map|Timeline)" screen$/,
  async (headingText, screen) => {
    const view = screen === 'Timeline' ? 'timeline_header_leftside' : 'mapview_leftside_header';
    const selector = getSelector.projectOverview.listHeading(view);
    await client.waitForElementVisible(selector);
    await client.getText(selector, ({ value }) => expect(value).to.contain(headingText));
  },
);

Then(/^user sees location markers representing the project's status$/, async () => {
  const { locationMarkers, projects } = getSelector.projectOverview.mapView;
  await client.waitForElementVisible(locationMarkers(), constants.MEDIUM_TIMEOUT);
  const projectsIds = await getDomData.idsFromElements(projects());
  const markersIds = await getDomData.idsFromElements(locationMarkers());
  expect(projectsIds.length).to.be.at.most(markersIds.length);
});

Then(/^user sees the UK map on Projects Overview map screen$/, async () => {
  const selector = getSelector.projectOverview.mapView.map();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
});

Then(/^user sees the total number of projects in the middle of the chart$/, async () => {
  const { pieChart, pieChartTotalNumber } = getSelector.projectOverview.mapView;
  const { legendNumber } = getSelector.projectOverview.timelineLegend;

  await client.waitForElementVisible(pieChart(), constants.MEDIUM_TIMEOUT);
  const legendProjects = await getDomData.textFromElements(legendNumber());
  const noOfProjects = legendProjects.map((element) => parseInt(element.match(/\d{1,2}/)[0]), 10);
  const legendProjectsTotal = noOfProjects.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  await client.getText(pieChartTotalNumber(), ({ value }) => expect(legendProjectsTotal).to.equal(parseInt(value), 10));
});

Then(/^user sees a pie chart with "([^"]*)" text inside$/, async (text) => {
  const { pieChartTotalText } = getSelector.projectOverview.mapView;
  await client.waitForElementVisible(pieChartTotalText());
  await client.getText(pieChartTotalText(), ({ value }) => expect(text).to.equal(value));
});

Then(/^user sees a filter button on Project Overview "(Map|Timeline)" screen$/, async (screen) => {
  const { filterBtn } = getSelector.projectOverview;
  const view = screen === 'Timeline' ? 'timeline_header_leftside' : 'mapview_leftside_header';
  await client.waitForElementVisible(filterBtn(view), constants.MEDIUM_TIMEOUT);
});

Then(
  /^user sees a search input with "([^"]*)" text as placeholder on Project Overview "(Map|Timeline)" screen$/,
  async (text, screen) => {
    const view = screen === 'Timeline' ? 'timeline_header_leftside' : 'mapview_leftside_header';
    const selector = getSelector.projectOverview.searchInput(view);
    await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
    await client.assert.domPropertyEquals(selector, 'placeholder', text);
  },
);

When(/^user types "([^"]*)" in the search input on Project Overview "(Map|Timeline)" screen$/, async (text, screen) => {
  const view = screen === 'Timeline' ? 'timeline_header_leftside' : 'mapview_leftside_header';
  const selector = getSelector.projectOverview.searchInput(view);
  await client
    .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
    .setValue(selector, ['', [client.Keys.CONTROL, 'a']])
    .keys(client.Keys.BACK_SPACE)
    .setValue(selector, text)
    .keys(client.Keys.ENTER);
});

Then(
  /^user sees "([^"]*)" text in the search input on Project Overview "(Map|Timeline)" screen$/,
  async (text, screen) => {
    const view = screen === 'Timeline' ? 'timeline_header_leftside' : 'mapview_leftside_header';
    const selector = getSelector.projectOverview.searchInput(view);
    await client
      .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
      .getValue(selector, ({ value }) => expect(text).to.equal(value));
  },
);

When(/^user presses "([^"]*)" key$/, async (key) => {
  await client.keys(client.Keys[key]);
});

When(/^user clicks Search icon on Project Overview "(Map|Timeline)" screen$/, async (text, screen) => {
  const view = screen === 'Timeline' ? 'timeline_header_leftside' : 'mapview_leftside_header';
  const selector = getSelector.projectOverview.searchIcon(view);
  await client
    .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
    .getValue(selector, ({ value }) => expect(text).to.equal(value));
});

When(/^user clicks filter button on Project Overview "(Timeline|Map)" screen$/, async (screen) => {
  const { filterBtn } = getSelector.projectOverview;
  const view = screen === 'Timeline' ? 'timeline_header_leftside' : 'mapview_leftside_header';
  await client.waitForElementVisible(filterBtn(view), constants.MEDIUM_TIMEOUT).click(filterBtn(view));
});

Then(/^user "(sees|does not see)" a filter modal on Project Overview screen$/, async (action) => {
  const selector = getSelector.projectOverview.filterModal.modal();
  if (action === 'sees') await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  else await client.waitForElementNotPresent(selector, constants.MEDIUM_TIMEOUT);
});

Then(/^user sees "([^"]*)" text as the filter modal title$/, async (text) => {
  const { title } = getSelector.projectOverview.filterModal;
  await client.waitForElementVisible(title(), constants.MEDIUM_TIMEOUT);
  await client.getText(title(), ({ value }) => expect(text).to.equal(value));
});

Then(/^user "(sees|clicks)" "(Close|Apply|Clear)" button on the filter modal$/, async (action, button) => {
  let selector;
  switch (button) {
    case 'Apply':
      selector = getSelector.projectOverview.filterModal.applyBtn();
      break;
    case 'Close':
      selector = getSelector.projectOverview.filterModal.closeBtn();
      break;
    case 'Clear':
      selector = getSelector.projectOverview.filterModal.clearBtn();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  if (action === 'sees') await client.waitForElementVisible(selector);
  else await client.waitForElementVisible(selector).click(selector);
});

When(/^user clicks "([^"]*)" checkbox on the filter modal$/, async (option) => {
  let selector;
  switch (option) {
    case 'Opportunity':
      selector = getSelector.projectOverview.filterModal.opportunityCheckbox();
      break;
    case 'Bid':
      selector = getSelector.projectOverview.filterModal.bidCheckbox();
      break;
    case 'PCSA':
      selector = getSelector.projectOverview.filterModal.pcsaCheckbox();
      break;
    case 'Live':
      selector = getSelector.projectOverview.filterModal.liveCheckbox();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementPresent(selector, constants.MEDIUM_TIMEOUT).click(selector);
});

Then(/^user sees "([^"]*)" checkbox as "(checked|unchecked)" on the filter modal$/, async (checkbox, state) => {
  let selector;
  switch (checkbox) {
    case 'Opportunity':
      selector = getSelector.projectOverview.filterModal.opportunityCheckbox();
      break;
    case 'Bid':
      selector = getSelector.projectOverview.filterModal.bidCheckbox();
      break;
    case 'PCSA':
      selector = getSelector.projectOverview.filterModal.pcsaCheckbox();
      break;
    case 'Live':
      selector = getSelector.projectOverview.filterModal.liveCheckbox();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementPresent(selector, constants.MEDIUM_TIMEOUT);
  if (state === 'unchecked') await client.expect.element(selector).to.not.be.selected;
  else await client.expect.element(selector).to.be.selected;
});

Then(/^user sees "([^"]*)" option displayed on filter preview section$/, async (option) => {
  const selector = getSelector.projectOverview.filterPreview.previewSection();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).assert.containsText(selector, option);
});

When(
  /^user selects "([^"]*)" as an option for "(Business Unit|Sector|UK Region)" on the filter modal$/,
  async (option, filter) => {
    let selector;
    switch (filter) {
      case 'Business Unit':
        selector = getSelector.projectOverview.filterModal.businessUnitDropdown();
        break;
      case 'Sector':
        selector = getSelector.projectOverview.filterModal.sectorDropdown();
        break;
      case 'UK Region':
        selector = getSelector.projectOverview.filterModal.regionDropdown();
        break;
      default:
        throw new Error('Incorrect case inputted!');
    }
    const filterOption = getSelector.projectOverview.filterModal.listOption(option);
    await client
      .moveToElement(selector, 1, 1)
      .mouseButtonDown(0)
      .waitForElementVisible(filterOption)
      .click(filterOption)
      .pause(1000);
  },
);

Then(
  /^user sees "([^"]*)" as the selected option for "(Business Unit|Sector|UK Region)" on the filter modal$/,
  async (option, filter) => {
    let selector;
    switch (filter) {
      case 'Business Unit':
        selector = getSelector.projectOverview.filterModal.businessUnitDropdown();
        break;
      case 'Sector':
        selector = getSelector.projectOverview.filterModal.sectorDropdown();
        break;
      case 'UK Region':
        selector = getSelector.projectOverview.filterModal.regionDropdown();
        break;
      default:
        throw new Error('Incorrect case inputted!');
    }
    const optionToCheck = option === 'Blank' ? '' : option;
    await client.assert.value(selector, optionToCheck);
  },
);

Then(/^user sets "(Minimum|Maximum)" value range as "([^"]*)" on the filter modal$/, async (type, value) => {
  let selector;
  if (type === 'Minimum') selector = getSelector.projectOverview.filterModal.minValueInput();
  else selector = getSelector.projectOverview.filterModal.maxValueInput();
  await client.waitForElementVisible(selector).setValue(selector, value);
});

Then(/^user sees "([^"]*)" as the "(Minimum|Maximum)" value range on the filter modal$/, async (value, type) => {
  let selector;
  if (type === 'Minimum') selector = getSelector.projectOverview.filterModal.minValueInput();
  else selector = getSelector.projectOverview.filterModal.maxValueInput();
  const valueToCheck = value === 'Blank' ? '' : value;
  await client.waitForElementVisible(selector).assert.value(selector, valueToCheck);
});

Then(/^user refreshes the page$/, async () => {
  await client.refresh();
});

Then(/^user "(sees|does not see)" the filter preview section on Project Overview screen$/, async (action) => {
  const selector = getSelector.projectOverview.filterPreview.previewSection();
  if (action === 'sees') await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  else await client.waitForElementNotVisible(selector, constants.MEDIUM_TIMEOUT);
});

Then(/^user clicks Remove filter button on filter preview section$/, async () => {
  const selector = getSelector.projectOverview.filterPreview.removeFilterBtn();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).click(selector);
});

Then(
  /^user sees only projects with "(Project|Client)" name as "([^"]*)" on Project Overview "(Map|Timeline)" screen$/,
  async (cardElement, text, screen) => {
    const { projectOverview } = getSelector;
    const mapProjects = projectOverview.mapView.projects();
    const timelineProjects = projectOverview.timelineView.projects();
    const selector = screen === 'Map' ? mapProjects : timelineProjects;

    let sElement;
    if (cardElement === 'Project') {
      sElement = screen === 'Map' ? projectOverview.mapView.projectName() : projectOverview.timelineView.projectName();
    } else {
      sElement = screen === 'Map' ? projectOverview.mapView.clientName() : projectOverview.timelineView.clientName();
    }

    const founElements = await getDomData.idsFromElements(selector);

    for (const element of founElements) {
      let elementId;
      await client.elementIdElement(element, 'css selector', sElement, ({ value }) => {
        elementId = value.ELEMENT;
      });
      await client.elementIdText(elementId, ({ value }) => {
        expect(text).to.equal(value);
      });
    }
  },
);

When(
  /^user clicks project with "(Project|Client)" name as "([^"]*)" on Project Overview "(Map|Timeline)" screen$/,
  async (cardElement, text, screen) => {
    const { projectOverview } = getSelector;
    const mapProjects = projectOverview.mapView.projects();
    const timelineProjects = projectOverview.timelineView.projects();
    const selector = screen === 'Map' ? mapProjects : timelineProjects;

    let sElement;
    if (cardElement === 'Project') {
      sElement = screen === 'Map' ? projectOverview.mapView.projectName() : projectOverview.timelineView.projectName();
    } else {
      sElement = screen === 'Map' ? projectOverview.mapView.clientName() : projectOverview.timelineView.clientName();
    }

    const founElements = await getDomData.idsFromElements(selector);

    let found;
    let cardToClick;
    for (const element of founElements) {
      let elementId;
      await client.elementIdElement(element, 'css selector', sElement, ({ value }) => {
        elementId = value.ELEMENT;
      });
      await client.elementIdText(elementId, ({ value }) => {
        found = value === text;
      });
      if (found) {
        cardToClick = elementId;
        break;
      }
    }
    if (!found) throw new Error(`${cardElement} with ${text} name cant't be found!`);
    await client.elementIdClick(cardToClick);
  },
);

When(/^user clicks the first "([^"]*)" stage project card$/, async (stage) => {
  let selector;
  switch (stage) {
    case 'Opportunity':
      selector = getSelector.projectOverview.opportunityStage();
      break;
    case 'Bid':
      selector = getSelector.projectOverview.bidStage();
      break;
    case 'PCSA':
      selector = getSelector.projectOverview.pcsaStage();
      break;
    case 'Live Projects':
      selector = getSelector.projectOverview.liveProjectsStage();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  const foundElements = await getDomData.idsFromElements(selector);
  if (foundElements) {
    await client.moveTo(foundElements[0], 0, 0).mouseButtonClick('left');
  } else throw new Error(`${status} projects not found!`);
});

When(/^user selects the first project that has an unassigned role from Timeline view$/, async () => {
  const projects = getSelector.projectOverview.timelineView.projects();
  const pageTitle = getSelector.projectDetails.title();
  const unassignedRole = getSelector.projectDetails.hierarchy.unassignedRole();
  const foundProjects = await getDomData.idsFromElements(projects);

  let found = false;
  for (const projectId of foundProjects) {
    await client
      .moveTo(projectId)
      .mouseButtonDown('left')
      .mouseButtonUp('left')
      .waitForElementVisible(pageTitle, constants.MEDIUM_TIMEOUT)
      .isVisible(unassignedRole, ({ value }) => {
        found = value;
      });
    if (found) break;
    else await client.back();
  }
  if (!found) throw new Error('Projects with unassigned roles not found!');
});
