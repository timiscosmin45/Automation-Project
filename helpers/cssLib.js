const cssLib = {
  child: (childNumber) => {
    return `:nth-child(${childNumber})`;
  },
  header: {
    header: () => '.container header',
    logo: () => `${cssLib.header.header()} .brand.greenLogo`,
    searchForm: () => `${cssLib.header.header()} form.search-form`,
    searchInput: () => `${cssLib.header.searchForm()} input`,
    searchButton: () => `${cssLib.header.searchForm()} search-button`,
    cartIcon: () => `${cssLib.header.header()} .cart-icon`,
    cartInfo: () => `${cssLib.header.header()} .cart-info`,
    cartItems: () => `${cssLib.header.cartInfo()} tr${cssLib.child(1)} strong`,
    cartPrice: () => `${cssLib.header.cartInfo()} tr${cssLib.child(2)} strong`,
    cartModal: () => '.cart-preview.active',
    emptyCartMessage: () => `${cssLib.header.cartModal()} .empty-cart h2`,
    cartProducts: () => `${cssLib.header.cartModal()} .cart-items .cart-item`,
    checkoutButton: () => `${cssLib.header.cartModal()} button`,
    topDeals: () => `${cssLib.header.header()} .cart-header-navlink${cssLib.child(2)}`,
    flightBooking: () => `${cssLib.header.header()} .cart-header-navlink${cssLib.child(3)}`,
  },
  homePage: {
    products: () => '.products',
    product: () => `${cssLib.homePage.products()} .product`,
    productName: () => `${cssLib.homePage.product()} .product-name`,
    productPrice: () => `${cssLib.homePage.product()} .product-price`,
    productQuantity: () => `${cssLib.homePage.product()} .quantity`,
    noResultsMsg: () => `${cssLib.homePage.products()} .no-results h2`,
    addToCartBtn: () => `${cssLib.homePage.product()} .product-action button`,
  },
  checkoutPage: {
    checkoutWrapper: () => '.products-wrapper',
    productImage: () => `${cssLib.checkoutPage.checkoutWrapper()} .product-image`,
    productName: () => `${cssLib.checkoutPage.checkoutWrapper()} .product-name`,
    productQuantity: () => `${cssLib.checkoutPage.checkoutWrapper()} .quantity`,
    emptyCartMessage: () => `${cssLib.checkoutPage.checkoutWrapper()} .empty-cart h2`,
    productPrice: (index) =>
      `${cssLib.checkoutPage.checkoutWrapper()} tr${cssLib.child(index)} td${cssLib.child(
        4,
      )} .amount`,
    productTotal: (index) =>
      `${cssLib.checkoutPage.checkoutWrapper()} tr${cssLib.child(index)} td${cssLib.child(
        5,
      )} .amount`,
    placeOrderBtn: () => `${cssLib.checkoutPage.checkoutWrapper()} button:last-child`,
    applyPromoCodeBtn: () => `${cssLib.checkoutPage.checkoutWrapper()} button${cssLib.child(2)}`,
    countryDropdown: () => `${cssLib.checkoutPage.checkoutWrapper()} select`,
    countryOptions: () => `${cssLib.checkoutPage.checkoutWrapper()} select option`,
    agreementCheckout: () => `${cssLib.checkoutPage.checkoutWrapper()} .chkAgree`,
    proceedButton: () => `${cssLib.checkoutPage.checkoutWrapper()} button`,
    errorAlert: () => `${cssLib.checkoutPage.checkoutWrapper()} .errorAlert`,
    successfulMessage: () => `${cssLib.checkoutPage.checkoutWrapper()} .wrapperTwo > span`,
    promoCodeInput: () => `${cssLib.checkoutPage.checkoutWrapper()} .promoWrapper input`,
    promoCodeErrMsg: () => `${cssLib.checkoutPage.checkoutWrapper()} .promoInfo`,
  },
  topDealsPage: {
    tableWrapper: () => '.tableWrapper .table',
  },
  flightBookingPage: {
    banner: () => '.home_banner',
  },
};

module.exports = cssLib;
