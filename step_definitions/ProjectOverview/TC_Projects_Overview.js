const { client } = require('nightwatch-api');
const { Given, When, Then } = require('cucumber');
const { constants, getSelector, getDomData, getDate } = require('../../helpers');
const { expect, assert } = require('chai');
const moment = require('moment');
const selectors = require('../../helpers/selectors');

Given(/^user opens LOR RSAR application$/, async () => {
  await client.deleteCookies();
  await client.init(constants.URL);
  await client.maximizeWindow();
  await client.waitForElementPresent('title', constants.MEDIUM_TIMEOUT);
  // await client.assert.title(''); should we have a page title?
});

Then(/^user sees "([^"]*)" screen$/, async (screen) => {
  let selector;
  let expectedEndpoint;
  switch (screen) {
    case 'Project Overview Timeline':
      selector = getSelector.projectOverview.timelineView.timelineSection();
      expectedEndpoint = '/';
      break;
    case 'Project Overview Map':
      selector = getSelector.projectOverview.mapView.map();
      expectedEndpoint = '/';
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).assert.urlContains(expectedEndpoint);
});

Then(/^user sees "([^"]*)" as the webpage title$/, async (title) => {
  await client.waitForElementPresent('title', constants.MEDIUM_TIMEOUT).assert.title(title);
});

Then(/^user sees "([^"]*)" as the screen title$/, async (title) => {
  let selector;
  switch (title) {
    case 'PROJECTS OVERVIEW':
      selector = getSelector.projectOverview.title();
      break;
    case 'Project Details':
      selector = getSelector.projectDetails.title();
      break;
    case 'Unnasigned People':
      selector = getSelector.unassignedPeople.title();
      break;
    case 'Find Candidates':
      selector = getSelector.FindCandidates.title();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementPresent(selector, constants.SHORT_TIMEOUT);
  await client.getText(selector, ({ value }) => assert.equal(title, value));
});

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

Then(/^user sees a list of LOR Projects on the Project Overview "(timeline|map)" screen$/, async (screen) => {
  const selector =
    screen === 'map'
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
  const selector = getSelector.projectOverview.timelineView.projects();
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
    case 'date label':
      elementSelector = getSelector.projectOverview.mapView.projectLocation();
      break;
    case 'project location':
      elementSelector = getSelector.projectOverview.mapView.dateLabel();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  const founElements = await getDomData.idsFromElements(selector);
  for (const element of founElements) {
    await client.elementIdElement(element, 'css selector', elementSelector, ({ value }) => {
      expect(value).to.not.equal(undefined);
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
  const { MAP_TIMELINE, HIGHLIGHTED_MAP_TIMELINE } = constants.DESIGN_COLORS.BUTTONS;

  if (screen === 'Timeline') {
    await client.assert.cssProperty(btnMap, 'background-color', MAP_TIMELINE);
    await client.assert.cssProperty(btnTimeline, 'background-color', HIGHLIGHTED_MAP_TIMELINE);
  } else {
    await client.assert.cssProperty(btnMap, 'background-color', HIGHLIGHTED_MAP_TIMELINE);
    await client.assert.cssProperty(btnTimeline, 'background-color', MAP_TIMELINE);
  }
});

When(/^user clicks on the "(left|right)" navigation arrow on timeline section$/, async (arrow) => {
  const { leftNavigationArrow, rightNavigationArrow } = getSelector.projectOverview.timelineView;
  const selector = arrow === 'left' ? leftNavigationArrow() : rightNavigationArrow();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).click(selector);
});

Then(
  /^user sees "([^"]*)" text as the list heading on Project Overview "(map|timeline)" screen$/,
  async (headingText, screen) => {
    const selector =
      screen === 'timeline'
        ? getSelector.projectOverview.timelineView.listHeading()
        : getSelector.projectOverview.mapView.listHeading();

    await client.waitForElementVisible(selector).getText(selector, ({ value }) => assert.equal(value, headingText));
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
  // to be completed when I cand use something to verify that the map is UK's map
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

Then(/^user sees a search input with a filter button on Project Overview screen$/, async () => {
  const { searchInput, filterBtn } = getSelector.projectOverview;
  await client.waitForElementVisible(searchInput(), constants.MEDIUM_TIMEOUT);
  await client.waitForElementVisible(filterBtn(), constants.MEDIUM_TIMEOUT);
});

When(/^user clicks filter button on Project Overview screen$/, async () => {
  const { filterBtn } = getSelector.projectOverview;
  await client.waitForElementVisible(filterBtn(), constants.MEDIUM_TIMEOUT).click(filterBtn());
});

Then(/^user "(sees|does not see)" a filter modal on Project Overview screen$/, async (action) => {
  const { modal } = getSelector.projectOverview.filterModal;
  if (action === 'sees') await client.waitForElementVisible(modal(), constants.MEDIUM_TIMEOUT);
  else await client.waitForElementNotPresent(modal(), constants.MEDIUM_TIMEOUT);
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

When(/^user clicks "([^"]*)" checkbox on the filter modal$/, async (checkbox) => {
  let selector;
  switch (checkbox) {
    case 'Early Engagement':
      selector = getSelector.projectOverview.filterModal.earlyEngagement();
      break;
    case 'Bid':
      selector = getSelector.projectOverview.filterModal.bid();
      break;
    case 'PCSA':
      selector = getSelector.projectOverview.filterModal.pcsa();
      break;
    case 'Live':
      selector = getSelector.projectOverview.filterModal.live();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementPresent(selector, constants.MEDIUM_TIMEOUT).click(selector);
});

Then(/^user sees "([^"]*)" checkbox as "(checked|unchecked)" on the filter modal$/, async (checkbox, state) => {
  let selector;
  switch (checkbox) {
    case 'Early Engagement':
      selector = getSelector.projectOverview.filterModal.earlyEngagement();
      break;
    case 'Bid':
      selector = getSelector.projectOverview.filterModal.bid();
      break;
    case 'PCSA':
      selector = getSelector.projectOverview.filterModal.pcsa();
      break;
    case 'Live':
      selector = getSelector.projectOverview.filterModal.live();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementPresent(selector, constants.MEDIUM_TIMEOUT);
  if (state === 'unchecked') await client.expect.element(selector).to.not.be.selected;
  else await client.expect.element(selector).to.be.selected;
});

Then(/^user sees only "([^"]*)" projects on Project list$/, async (projectType) => {
  // waiting for selectors and DOM structure
});

Then(/^user sees "([^"]*)" status filter on the filter modal$/, async (status) => {
  // waiting for selectors and DOM structure
});

Then(/^user sees "([^"]*)" projects on Project list$/, async (status) => {
  // waiting for selectors and DOM structure
});
