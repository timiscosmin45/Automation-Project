const { client } = require('nightwatch-api');
const { Then } = require('cucumber');
const { assert } = require('chai');
const { constants, getSelector } = require('../../helpers');

Then(/^user sees "([^"]*)" as the project name$/, async (projectName) => {
  const selector = getSelector.projectDetails.projectName();
  await client
    .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
    .getText(selector, ({ value }) => assert.equal(projectName, value));
});

Then(
  /^user "(sees|clicks)" "(Project Overview|Project Details)" breadcrumb on the Project Overview screen$/,
  async (action, button) => {
    let selector;
    switch (button) {
      case 'Project Overview':
        selector = getSelector.projectDetails.projectOverviewBreadcrumb();
        break;
      case 'Project Details':
        selector = getSelector.projectDetails.projectDetailsBreadcrumb();
        break;
      default:
        throw new Error('Incorrect case inputted!');
    }

    if (action === 'sees') {
      await client
        .waitForElementVisible(selector, constants.MEDIUM_TIMEOUT)
        .getText(selector, ({ value }) => assert.equal(button, value));
    } else {
      await client.waitForElementVisible(selector, constants.MEDIUM_TIMEOUT).click(selector);
    }
  },
);

Then(/^user sees the Project Details breadcrumb highlighted$/, async () => {
  const breadcrumbSelector = getSelector.projectDetails.projectDetailsBreadcrumb();
  const { HIGHLIGHTED_BUTTON } = constants.DESIGN_COLORS.BUTTONS;

  await client.assert.cssProperty(breadcrumbSelector, 'background-color', HIGHLIGHTED_BUTTON);
});

Then(/^user clicks browser back button$/, async () => {
  await client.back();
});
