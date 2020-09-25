const { client } = require('nightwatch-api');
const { Given, When, Then } = require('cucumber');
const { constants, getSelector, getDomData } = require('../../helpers');
const { expect, assert } = require('chai');

Given(/^user opens LOR RSAR application$/, async () => {
  await client.deleteCookies();
  await client.init(constants.URL);
  await client.maximizeWindow();
  await client.waitForElementPresent('title', constants.MEDIUM_TIMEOUT);
  await client.assert.title('');
});

Then(/^user sees "([^"]*)" as the webpage title$/, async (title) => {
  await client.waitForElementPresent('title', constants.MEDIUM_TIMEOUT).assert.title(title);
});

Then(/^user sees "([^"]*)" screen$/, async (screen) => {
  let expectedEndpoint;
  switch (screen) {
    case 'Project overview':
      expectedEndpoint = '/projectsOverview';
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
  await client.urlContains(expectedEndpoint);
});

Then(/^user sees "([^"]*)" as the screen title$/, async (title) => {
  let selector;
  switch (title) {
    case 'Project overview':
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
  await client.waitForElementPresent(selector, constants.SHORT_TIMEOUT).assert.value(selector, title);
});

When(/^user "(sees|clicks)" "(Timeline|Map)" button on the Project Overview screen$/, async (button, action) => {
  let selector;
  switch (button) {
    case 'Map':
      selector = getSelector.projectOverview.mapBtn();
      break;
    case 'Timeline':
      selector = getSelector.projectOverview.mapBtn();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  if (action === 'sees') await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT);
  else await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).click(selector);
});

Then(/^user sees a list of LOR Projects on the Project Overview screen$/, async () => {
  const selector = getSelector.projectOverview.timelineView.projects();
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
      expect(value).to.not.equal(undefined);
    });
  }
});
