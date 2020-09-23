const { client } = require('nightwatch-api');
const { When, And } = require('cucumber');
const { constants, getSelector } = require('../../helpers');

When(/^user clicks on "([^"]*)" option from side menu$/, async (option) => {
  let selector;
  switch (option) {
    case 'Project overview':
      selector = getSelector.sideMenu.projectOverviewOption();
      break;
    case 'Unassigned People':
      selector = getSelector.sideMenu.uassignedPeopleOption();
      break;
    case 'Unassigned Roles':
      selector = getSelector.sideMenu.unassignedRolesOption();
      break;
    default:
      throw new Error('Incorrect case!');
  }
  await client.click(selector);
});

And(/^user sees the side menu bar present$/, async () => {
  await client.waitForElementPresent(getSelector.sideMenu.sideMenuBar(), constants.MEDIUM_TIMEOUT);
});

And(/^user sees "([^"]*)" option marked in yellow$/, async (option) => {
  let selector;
  switch (option) {
    case 'Project overview':
      selector = getSelector.sideMenu.projectOverviewOption();
      break;
    case 'Unassigned People':
      selector = getSelector.sideMenu.uassignedPeopleOption();
      break;
    case 'Unassigned Roles':
      selector = getSelector.sideMenu.unassignedRolesOption();
      break;
    default:
      throw new Error('Incorrect case!');
  }
  await client.assert.cssProperty(selector, '', ''); // to be filled later with the css property
});
