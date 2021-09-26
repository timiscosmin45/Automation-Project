const { expect } = require('chai');
const { client } = require('nightwatch-api');
const commonVars = require('./commonVars');
const cssLib = require('./cssLib');

const basicActions = {
  checkPageVisibility: async (sPage) => {
    const page = {
      Home: cssLib.header.cartIcon(),
      TopDeals: cssLib.topDealsPage.tableWrapper(),
      FlightBooking: cssLib.flightBookingPage.banner(),
    };

    if (!page[sPage]) throw new Error('Incorrect page provided!');
    else await client.waitForElementVisible(page[sPage], commonVars.SHORT_TIMEOUT);
  },

  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  checkElementText: async (element, message) => {
    await client.waitForElementVisible(element, commonVars.SHORT_TIMEOUT);
    await client.getText(element, ({ value }) => expect(value).to.contain(message));
  },

  enterInput: async (element, input) => {
    await client
      .waitForElementVisible(element, commonVars.SHORT_TIMEOUT)
      .clearValue(element)
      .setValue(element, ['', [client.Keys.CONTROL, 'a']])
      .keys(client.Keys.BACK_SPACE)
      .setValue(element, input)
      .keys(client.Keys.TAB);
  },

  checkButtonState: async (element, state) => {
    await client.waitForElementVisible(element, commonVars.SHORT_TIMEOUT);
    await client.assert.attributeEquals(element, 'class', state);
  },

  clickOnElement: async (element) => {
    await client.waitForElementVisible(element, commonVars.MEDIUM_TIMEOUT);
    await client.click(element);
  },

  checkElementVisibility: async (element) => {
    await client.waitForElementVisible(element, commonVars.MEDIUM_TIMEOUT);
    await client.assert.visible(element);
  },
};

module.exports = basicActions;
