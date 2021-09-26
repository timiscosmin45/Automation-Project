require('dotenv').config();

const commonVars = {
  products: [],
  productList: [],
  URL: process.env.URL,
  LONG_TIMEOUT: 30000,
  MEDIUM_TIMEOUT: 10000,
  SHORT_TIMEOUT: 5000,
};

module.exports = commonVars;
