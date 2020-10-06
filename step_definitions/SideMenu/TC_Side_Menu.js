const { client } = require('nightwatch-api');
const { When, Then } = require('cucumber');
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

Then(/^user sees the side menu bar present$/, async () => {
  await client.waitForElementPresent(getSelector.sideMenu.sideMenuBar(), constants.MEDIUM_TIMEOUT);
});

Then(/^user sees "([^"]*)" option marked in yellow$/, async (option) => {
  let selector;
  switch (option) {
    case 'Project overview':
      selector = getSelector.sideMenu.projectOverviewText();
      break;
    case 'Unassigned People':
      selector = getSelector.sideMenu.uassignedPeopleText();
      break;
    case 'Unassigned Roles':
      selector = getSelector.sideMenu.unassignedRolesText();
      break;
    default:
      throw new Error('Incorrect case!');
  }
  await client.assert.cssProperty(selector, 'color', constants.DESIGN_COLORS.HIGHLIGHTED_MAP_TIMELINE_BTN);
});
