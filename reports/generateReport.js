const reporter = require('cucumber-html-reporter');

const options = {
  name: 'EVOLVE',
  theme: 'bootstrap',
  jsonDir: 'reports',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
  ignoreBadJsonFile: true,
  storeScreenShots: false,
  brandTitle: 'SP Evolve',
  metadata: {
    'App Version': '0.9.0',
    Browser: 'Chrome',
    Platform: 'Windows 10',
    Parallel: 'Scenarios',
    Executed: 'Remote',
  },
};

reporter.generate(options);
