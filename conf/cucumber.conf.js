const { setDefaultTimeout, AfterAll, BeforeAll, After } = require('cucumber');
const { createSession, closeSession, startWebDriver, stopWebDriver } = require('nightwatch-api');
const { commonVars } = require('../helpers');

setDefaultTimeout(60000);

BeforeAll(async () => {
  await startWebDriver({
    env: 'chrome',
    configFile: 'conf/nightwatch.conf.js',
    silent: false,
  });
  await createSession();
});

After(() => {
  commonVars.products = [];
});

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();
});
