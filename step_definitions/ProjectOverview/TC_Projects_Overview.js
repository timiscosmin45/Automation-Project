const { client } = require('nightwatch-api');
const { Given, When, Then } = require('cucumber');
const { constants, getSelector, getDomData, getDate } = require('../../helpers');
const { expect, assert } = require('chai');
const moment = require('moment');

Given(/^user opens LOR RSAR application$/, async () => {
  await client.deleteCookies();
  await client.init(constants.URL);
  await client.maximizeWindow();
  await client.waitForElementPresent('title', constants.MEDIUM_TIMEOUT);
  // await client.assert.title(''); should we have a page title?
});

Given(/^user is on the "([^"]*)" screen/, async (screen) => {
  let selector;
  switch (screen) {
    case 'Projects Overview timeline':
      selector = getSelector.projectOverview.timelineView.projects();
      break;
    case 'Projects Overview map':
      selector = getSelector.projectOverview.mapView.projects();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
});

Then(/^user sees "([^"]*)" as the webpage title$/, async (title) => {
  await client.waitForElementPresent('title', constants.MEDIUM_TIMEOUT).assert.title(title);
});

Then(/^user sees "([^"]*)" screen$/, async (screen) => {
  let expectedEndpoint;
  switch (screen) {
    case 'Projects Overview':
      expectedEndpoint = '/';
      break;
    case 'Unassigned People':
      expectedEndpoint = '/unassignedPeople';
      break;
    case 'Unassigned Roles':
      expectedEndpoint = '/unassignedRoles';
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.assert.urlContains(expectedEndpoint);
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
    await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).getText(selector, ({ value }) => assert.equal(button, value));
  } else await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).click(selector);
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
      elementId = value.ELEMENT;
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
  const formattedElements = foundElements[0].replace(/(\r\n|\n|\r)/gm, ' ').split(' ')
  const months = moment.monthsShort();
  expect(formattedElements).to.have.ordered.members(months.concat(months));
});

Then(/^user sees "(left|right)" label date as "([^"]*)" displayed on timeline section$/, async (label, yearText) => {
  const { leftYearLabel, rightYearLabel } = getSelector.projectOverview.timelineView;
  const selector = label === 'left' ? leftYearLabel() : rightYearLabel();
  const expectedYear = getDate.getYear(yearText);
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).getText(selector, ({ value }) => assert.equal(value, expectedYear))
});

Given(/^user sees the timeline section on Projects Overview timeline screen$/, async () => {
  const selector = getSelector.projectOverview.timelineView.timelineSection()
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

Then(/^user sees Project Overview - "(Timeline|Map)"$/, async (screen) => {
  if (screen === 'Timeline') {
    await client
      .waitForElementVisible(getSelector.projectOverview.timelineView.calendar(), constants.MEDIUM_TIMEOUT)
      .waitForElementVisible(getSelector.projectOverview.timelineLegend.legendList(), constants.MEDIUM_TIMEOUT);
  } else {
    await client
      .waitForElementVisible(getSelector.projectOverview.mapView.map(), constants.MEDIUM_TIMEOUT)
      .waitForElementVisible(getSelector.projectOverview.mapView.mapLegend(), constants.MEDIUM_TIMEOUT);
  }
});

Then(/^user sees toggle showing the "(Timeline|Map)" option highlighted$/, async (screen) => {
  const mapButton = getSelector.projectOverview.mapBtn();
  const timelineButton = getSelector.projectOverview.timelineBtn();
  if (screen === 'Timeline') {
    await client
      .waitForElementVisible(mapButton, constants.MEDIUM_TIMEOUT)
      .waitForElementVisible(timelineButton, constants.MEDIUM_TIMEOUT)
      .assert.cssProperty(mapButton, 'background-color', constants.DESIGN_COLORS.MAP_TIMELINE_BTN)
      .assert.cssProperty(timelineButton, 'background-color', constants.DESIGN_COLORS.HIGHLIGHTED_MAP_TIMELINE_BTN);
  } else {
    await client
      .waitForElementVisible(mapButton, constants.MEDIUM_TIMEOUT)
      .waitForElementVisible(timelineButton, constants.MEDIUM_TIMEOUT)
      .assert.cssProperty(mapButton, 'background-color', constants.DESIGN_COLORS.HIGHLIGHTED_MAP_TIMELINE_BTN)
      .assert.cssProperty(timelineButton, 'background-color', constants.DESIGN_COLORS.MAP_TIMELINE_BTN);
  }
});

When(/^user clicks on the "(left|right)" navigation arrow on timeline section$/, async (arrow) => {
  const { leftNavigationArrow, rightNavigationArrow } = getSelector.projectOverview.timelineView;
  const selector = arrow === 'left' ? leftNavigationArrow() : rightNavigationArrow();
  await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).click(selector)
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
