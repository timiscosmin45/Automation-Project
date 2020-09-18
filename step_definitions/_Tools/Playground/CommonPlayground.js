const { client } = require('nightwatch-api');
const { Given } = require('cucumber');

Given(/^playground open "([^"]*)" html page$/, async (page) => {
  const dir = process.cwd(); // current working directory
  let url;
  switch (page) {
    case 'google':
      url = 'https://www.google.com';
      break;
    case 'w3schools':
      url = 'https://www.w3schools.com/html/html_form_elements.asp';
      break;
    default:
      url = `file:///${dir}/HTMLfiles/${page}.html`;
  }
  await client.init(url);
});
