const { setDefaultTimeout, AfterAll, BeforeAll } = require('cucumber');
const { createSession, closeSession, startWebDriver, stopWebDriver } = require('nightwatch-api');

setDefaultTimeout(60000);

BeforeAll(async () => {
  await startWebDriver({
    env: 'chrome',
    configFile: 'conf/nightwatch.conf.js',
    silent: false,
  });
  await createSession();
});

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();
});
