const { client } = require('nightwatch-api');
const { Given, When, Then } = require('cucumber');
const { constants, getSelector } = require('../helpers');
const { assert } = require('chai');

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
    case 'Project Details':
      selector = getSelector.projectDetails.title();
      expectedEndpoint = '/projectDetails';
      break;
    case 'Find Candidates':
      // to be added later
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
    case 'PROJECT DETAILS':
      selector = getSelector.projectDetails.title();
      break;
    case 'Unnasigned People':
      selector = getSelector.unassignedPeople.title();
      break;
    case 'FIND CANDIDATES':
      selector = getSelector.findCandidates.title();
      break;
    default:
      throw new Error('Incorrect case inputted!');
  }
  await client.waitForElementPresent(selector, constants.SHORT_TIMEOUT);
  await client.getText(selector, ({ value }) => assert.equal(title, value));
});

When(/^user waits "([1-9][0-9]*)" seconds$/, async (seconds) => {
  await new Promise((resolve) => setTimeout(resolve, parseInt(seconds) * 1000), 10);
});