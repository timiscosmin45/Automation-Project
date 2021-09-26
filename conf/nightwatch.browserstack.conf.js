require('dotenv').config();

const nightwatch_config = {
  webdriver: {
    start_process: false,
    host: 'hub-cloud.browserstack.com',
    port: 443,
  },

  test_settings: {
    default: {
      disable_error_log: true,
      browserStack: true,
      test_workers: false,
      output_folder: 'reports',
      custom_assertions_path: '',
      live_output: true,
      disable_colors: false,

      desiredCapabilities: {
        'browserstack.user': process.env.BROWSERSTACK_USER,
        'browserstack.key': process.env.BROWSERSTACK_KEY,
      },
    },
    chrome: {
      desiredCapabilities: {
        os: 'Windows',
        os_version: '10',
        browserName: 'chrome',
        browser_version: 'latest',
      },
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        os: 'Windows',
        os_version: '10',
        browser_version: 'latest',
        'moz:webdriverClick': false,
      },
    },
    safari: {
      desiredCapabilities: {
        browserName: 'Safari',
        os: 'OS X',
        os_version: 'Catalina',
        browser_version: 'latest',
      },
    },
    edge: {
      desiredCapabilities: {
        browserName: 'edge',
        os: 'Windows',
        os_version: '10',
        browser_version: 'latest',
      },
    },
  },
};

for (const index in nightwatch_config.test_settings) {
  const config = nightwatch_config.test_settings[index];
  config.selenium_host = nightwatch_config.webdriver.host;
  config.selenium_port = nightwatch_config.webdriver.port;
}

module.exports = nightwatch_config;
