const { expect } = require('chai');
const { client } = require('nightwatch-api');
const { commonVars, storeProducts, basicActions, cssLib, getDomData } = require('../helpers');

const checkoutPage = {
  checkProducts: async () => {
    const checkoutProducts = await storeProducts.storeCheckoutValues();
    expect(checkoutProducts).to.have.same.deep.members(commonVars.products);
  },

  placeOrder: async () => {
    const placeOrderBtn = cssLib.checkoutPage.placeOrderBtn();
    await basicActions.sleep(1000);
    await basicActions.clickOnElement(placeOrderBtn);
  },

  selectCountry: async (country) => {
    const selectOptions = cssLib.checkoutPage.countryOptions();
    const proceedButton = cssLib.checkoutPage.proceedButton();
    const countries = await getDomData.idsFromElements(selectOptions);

    let elementId;
    for (element of countries) {
      let bFlag;
      await client.elementIdText(element, ({ value }) => {
        bFlag = value === country;
      });
      if (bFlag) {
        elementId = element;
        break;
      }
    }
    if (!elementId) throw new Error(`Country: "${country}" not found.`);
    else await client.elementIdClick(elementId);
    await basicActions.clickOnElement(proceedButton);
  },
};
module.exports = checkoutPage;
