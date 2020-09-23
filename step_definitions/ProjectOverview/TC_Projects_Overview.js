const { client } = require('nightwatch-api');
const { Then, Given } = require('cucumber');
const { constants, getSelector } = require('../../helpers');

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
      expectedEndpoint = ''; //to be filled later with the expected endpoint
      break;
    case 'Unassigned Roles' :
      expectedEndpoint = ''; //to be filled later with the expected endpoint
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
