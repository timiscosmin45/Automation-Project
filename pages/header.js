const { expect } = require('chai');
const { client } = require('nightwatch-api');
const { commonVars, cssLib, getDomData } = require('../helpers');

const header = {
  waitHeader: async () => {
    await client.waitForElementVisible(cssLib.header.header(), commonVars.MEDIUM_TIMEOUT);
  },

  checkHeaderLogo: async () => {
    await client.getText(cssLib.header.logo(), ({ value }) => expect(value).to.equal('GREENKART'));
  },

  checkHeaderSearch: async () => {
    await client.assert.visible(cssLib.header.searchForm(), 'The search input is vissible');
  },

  checkHeaderTabs: async () => {
    const sTopDeals = cssLib.header.topDeals();
    const sFlightBooking = cssLib.header.flightBooking();

    const topDeals = await getDomData.textFromElement(sTopDeals);
    const flightBooking = await getDomData.textFromElement(sFlightBooking);

    expect(topDeals).to.equal('Top Deals');
    expect(flightBooking).to.equal('Flight Booking');
  },
};

module.exports = header;
