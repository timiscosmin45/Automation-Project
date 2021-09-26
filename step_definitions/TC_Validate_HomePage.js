const { When, Then } = require('cucumber');
const { cssLib, basicActions } = require('../helpers');
const { homePage } = require('../pages');

When(/^user enters "([^"]*)" in the search input$/, (product) => homePage.searchProduct(product));

Then(/^user sees the correct results returned$/, () => homePage.checkSearchResults());

Then(/^user sees the correct error message for no products found$/, async () => {
  const selector = cssLib.homePage.noResultsMsg();
  await basicActions.checkElementText(selector, 'Sorry, no products matched your search!');
});

When(/^user adds "(\d+)" product units to the shopping cart$/, async (quantity) => {
  await homePage.addProductToCart(quantity);
});

Then(/^user sees the shopping cart is correctly updated$/, async () => {
  await homePage.checkCartItems();
  await homePage.checkCartPrice();
  await homePage.checkCartProducts();
});

When(/^user oppens the shopping cart$/, async () => {
  const cartIcon = cssLib.header.cartIcon();
  await basicActions.clickOnElement(cartIcon);
});

Then(/^user sees the correct message for empty shopping cart$/, async () => {
  const emptyCartMessage = cssLib.header.emptyCartMessage();
  await basicActions.checkElementText(emptyCartMessage, 'You cart is empty!');
});

Then(/^user sees the Checkout button "(disabled|enabled)"$/, async (state) => {
  const checkoutButton = cssLib.header.checkoutButton();
  await basicActions.checkButtonState(checkoutButton, state);
});
