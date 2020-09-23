const { client } = require('nightwatch-api');
const { When, And } = require('cucumber');
const { constants, getSelector } = require('../../helpers');

When(/^user clicks on "([^"]*)" option from side menu$/, async (option) => {
  let CSSselector;
  switch (option) {
      case 'Project overview':
          CSSselector = getSelector.sideMenu.projectOverviewOption();
          break;
      case 'Unassigned People':
          CSSselector = getSelector.sideMenu.uassignedPeopleOption();
          break;
       case 'Unassigned Roles':
          CSSselector = getSelector.sideMenu.unassignedRolesOption();
          break; 
      default:
          throw new Error('Incorrect case!');
  }
  await client.click(CSSselector)
});

And(/^user sees the side menu bar present$/, async () => {
    await client
      .waitForElementPresent(getSelector.sideMenu.sideMenuBar(), constants.MEDIUM_TIMEOUT);
});

And(/^user sees "([^"]*)" option marked in yellow$/, async (option) => {
    let CSSselector;
  switch (option) {
      case 'Project overview':
          CSSselector = getSelector.sideMenu.projectOverviewOption();
          break;
      case 'Unassigned People':
          CSSselector = getSelector.sideMenu.uassignedPeopleOption();
          break;
       case 'Unassigned Roles':
          CSSselector = getSelector.sideMenu.unassignedRolesOption();
          break; 
      default:
          throw new Error('Incorrect case!');
  }
    await client.assert.cssProperty(CSSselector, '', ''); // to be filled later with the css property
});