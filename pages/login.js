const { client } = require('nightwatch-api');
const { commonVars } = require('../helpers');

const login = {
  openApplication: async () => {
    if (commonVars.URL) await client.url(commonVars.URL);
    else throw new Error('No application provided!');
  },
};

module.exports = login;
