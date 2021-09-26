const { When, Then } = require('cucumber');
const { cssLib, basicActions } = require('../helpers');
const { checkoutPage, homePage } = require('../pages');

When(/^user clicks Proceed To checkout button$/, async () => {
  await homePage.clickProceedToCheckout();
});

Then(/^user sees the checkout page correctly updated$/, async () => {
  await basicActions.sleep(1000);
  await checkoutPage.checkProducts();
});

Then(/^user sees the correct error message for empty cart$/, async () => {
  const emptyCartMessage = cssLib.checkoutPage.emptyCartMessage();
  await basicActions.checkElementText(emptyCartMessage, 'You cart is empty!');
});

When(/^user proceeds to checkout "(\d+)" "([^"]*)"$/, async (quantity, product) => {
  await homePage.searchProduct(product);
  await homePage.addProductToCart(quantity);
  await homePage.clickProceedToCheckout();
});

When(/^user places the selected order$/, () => checkoutPage.placeOrder());

When(/^user sends the order with selected country as "([^"]*)"$/, async (country) => {
  await checkoutPage.selectCountry(country);
});

When(/^user agrees with the Terms & Conditions$/, async () => {
  const agreementChekout = cssLib.checkoutPage.agreementCheckout();
  await basicActions.clickOnElement(agreementChekout);
});

Then(/^user sees the order successfully placed$/, async () => {
  const selector = cssLib.checkoutPage.successfulMessage();
  const message = 'Thank you, your order has been placed successfully';
  await basicActions.checkElementText(selector, message);
});

Then(/^user sees an alert error message$/, async () => {
  const selector = cssLib.checkoutPage.errorAlert();
  const message = 'Please accept Terms & Conditions - Required';
  await basicActions.checkElementText(selector, message);
});

When(/^user applies an "(valid|invalid)" promo code$/, async (state) => {
  const inputField = cssLib.checkoutPage.promoCodeInput();
  const applyBtn = cssLib.checkoutPage.applyPromoCodeBtn();

  const promoCode = state === 'valid' ? 'valid' : 'invalid';
  await basicActions.enterInput(inputField, promoCode);
  await basicActions.clickOnElement(applyBtn);
});

Then(/user sees an error message indicating "(invalid|missing)"/, async (state) => {
  const selector = cssLib.checkoutPage.promoCodeErrMsg();
  const message = state === 'invalid' ? 'Invalid code ..!' : 'Empty code ..!';
  await basicActions.checkElementText(selector, message);
});

When(/^user clicks on apply promo code button$/, async () => {
  const applyBtn = cssLib.checkoutPage.applyPromoCodeBtn();
  await basicActions.clickOnElement(applyBtn);
});
