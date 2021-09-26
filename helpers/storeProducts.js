const commonVars = require('./commonVars');
const cssLib = require('./cssLib');
const getDomData = require('./getDomData');
const formatter = require('./formatter');

const storeProducts = {
  initProductObject: (productName) => {
    let bFlag = false;
    for (let index = 0; index <= commonVars?.products.length; index += 1) {
      if (commonVars.products[index]?.productName === productName) {
        bFlag = true;
        break;
      }
    }
    if (!bFlag) {
      commonVars.products.push({
        productName,
        productPrice: 0,
        productQuantity: 0,
        productValue: 0,
      });
    }
  },
  storeShopValues: (productName, price, quantity) => {
    for (const element of commonVars.products) {
      if (element.productName === productName) {
        element.productPrice = parseInt(price, 10);
        element.productQuantity += parseInt(quantity, 10);
        element.productValue += parseInt(price, 10) * parseInt(quantity, 10);
        break;
      }
    }
  },
  storeCheckoutValues: async () => {
    const productName = cssLib.checkoutPage.productName();
    const productQuantity = cssLib.checkoutPage.productQuantity();

    const productNameArr = formatter.formatProducts(await getDomData.textFromElements(productName));
    const productQuantityArr = await getDomData.textFromElements(productQuantity);

    const productPriceArr = [];
    const productTotalArr = [];
    for (const index in productNameArr) {
      const productPrice = cssLib.checkoutPage.productPrice(parseInt(index, 10) + 1);
      const productTotal = cssLib.checkoutPage.productTotal(parseInt(index, 10) + 1);

      productPriceArr.push(await getDomData.textFromElement(productPrice));
      productTotalArr.push(await getDomData.textFromElement(productTotal));
    }

    const productsArray = [];
    for (const index in productNameArr) {
      productsArray.push({
        productName: productNameArr[index],
        productPrice: parseInt(productPriceArr[index], 10),
        productQuantity: parseInt(productQuantityArr[index], 10),
        productValue: parseInt(productTotalArr[index], 10),
      });
    }
    return productsArray;
  },
};
module.exports = storeProducts;
