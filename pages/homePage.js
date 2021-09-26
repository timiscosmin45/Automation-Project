const { expect } = require('chai');
const { client } = require('nightwatch-api');
const {
  commonVars,
  cssLib,
  getDomData,
  formatter,
  basicActions,
  storeProducts,
} = require('../helpers');

const homePage = {
  searchProduct: async (productName) => {
    const search = cssLib.header.searchInput();
    const products = cssLib.homePage.productName();

    const productList = formatter.formatProducts(await getDomData.textFromElements(products));

    commonVars.productList = productList;
    storeProducts.initProductObject(productName);

    await basicActions.enterInput(search, productName);
    await basicActions.sleep('1000');
  },

  checkSearchResults: async () => {
    const selector = cssLib.homePage.productName();
    const { productName } = commonVars.products[0];

    if (commonVars.productList.includes(productName)) {
      await client.waitForElementVisible(selector, commonVars.shortTimeOut);
      const foundProducts = formatter.formatProducts(await getDomData.textFromElements(selector));
      if (!foundProducts.length) throw new Error('No products found!');
      foundProducts.forEach((item) => expect(commonVars.productList).to.include(item));
    } else throw new Error('Incorrect product provided!');
  },

  setProductQuantity: async (quantity) => {
    const selector = cssLib.homePage.productQuantity();
    await client.clearValue(selector).setValue(selector, quantity);
  },

  addProductToCart: async (quantity) => {
    const addButton = cssLib.homePage.addToCartBtn();
    const productName = cssLib.homePage.productName();
    const productPrice = cssLib.homePage.productPrice();
    const productQuantity = cssLib.homePage.productQuantity();

    const price = await getDomData.textFromElement(productPrice);
    const pName = formatter.formatProducts(await getDomData.textFromElement(productName));

    storeProducts.storeShopValues(pName, price, quantity);

    await basicActions.enterInput(productQuantity, quantity);
    await client.waitForElementVisible(addButton, commonVars.SHORT_TIMEOUT).click(addButton);
  },

  checkCartItems: async () => {
    const selector = cssLib.header.cartItems();

    const items = commonVars.products.length;
    await client.waitForElementVisible(selector, commonVars.shortTimeOut).pause(1000);
    await client.getText(selector, ({ value }) => expect(parseInt(value, 10)).to.equal(items));
  },

  checkCartPrice: async () => {
    const selector = cssLib.header.cartPrice();

    const totalValue = commonVars.products.reduce((a, b) => a + b.productValue, 0);
    await client.waitForElementVisible(selector, commonVars.shortTimeOut);
    await client.getText(selector, ({ value }) => expect(parseInt(value, 10)).to.equal(totalValue));
  },

  checkCartProducts: async () => {
    const cartIcon = cssLib.header.cartIcon();
    const cartProducts = cssLib.header.cartProducts();

    await client.waitForElementVisible(cartIcon, commonVars.SHORT_TIMEOUT).click(cartIcon);
    const products = await getDomData.textFromElements(cartProducts);

    commonVars.products.forEach((element) => {
      expect(formatter.formatProducts(products)).to.include(element.productName);
    });

    await client.click(cartIcon).waitForElementNotPresent(cartProducts, commonVars.SHORT_TIMEOUT);
  },

  clickProceedToCheckout: async () => {
    const checkoutBtn = cssLib.header.checkoutButton();
    const cartIcon = cssLib.header.cartIcon();

    await basicActions.clickOnElement(cartIcon);
    await basicActions.clickOnElement(checkoutBtn);
  },
};

module.exports = homePage;
