const { Given, When, Then } = require('cucumber');
const { login, header, homePage } = require('../pages');
const { basicActions } = require('../helpers');

Given(/^user opens the GREENKART application$/, async () => {
  await login.openApplication();
  await basicActions.checkPageVisibility('Home');
});

Then(/^user sees the GREENKART "([^"]*)" page$/, async (page) => {
  await basicActions.checkPageVisibility(page);
});

Then(/^user sees the application header$/, () => header.waitHeader());

Then(/^user sees the correct data displayed on the application header$/, async () => {
  await header.checkHeaderLogo();
  await header.checkHeaderSearch();
  await header.checkHeaderTabs();
});

Then(/^user waits "([1-9][0-9]*)" seconds$/, async (seconds) => {
  await basicActions.sleep(parseInt(seconds, 10) * 1000);
});

When(/^user adds "(\d+)" "([^"]*)" to the shopping cart$/, async (quantity, product) => {
  await homePage.searchProduct(product);
  await homePage.addProductToCart(quantity);
});
