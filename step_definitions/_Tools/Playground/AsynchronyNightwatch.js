/* eslint-disable no-console */
const { client } = require('nightwatch-api');
const { Then } = require('cucumber');

Then(/^playground GOOD asynchrony with Nightwatch$/, async () => {
  console.log('1st way: Await and do all asynchronous calls on the step level RECOMMENDED');
  await client.waitForElementPresent('body', 5000);
  await client.getText('body', (res) => {
    console.log(`Body says: ${res.value}`);
  });

  console.log('2nd way: Await and chain calls');
  await client.waitForElementPresent('body', 5000).getText('body', (res) => {
    console.log(`Again, body says: ${res.value}`);
  });

  console.log('3rd way: Return and chain calls');
  return client.waitForElementPresent('body', 5000).getText('body', (res) => {
    console.log(`One more time, body says: ${res.value}`);
  });
});

Then(/^playground WRONG asynchrony with Nightwatch 1$/, async () => {
  console.log('Wrong way: Try to get the result on the returned value, not in the callback');
  await client.waitForElementPresent('body', 5000);
  const res = await client.getText('body');
  console.log(`We get an undefined: ${res}`);
});

Then(/^playground WRONG asynchrony with Nightwatch 2$/, async () => {
  console.log('Wrong way: Not doing await');
  client.waitForElementPresent('body', 5000);
  client.getText('body', (res) => {
    console.log(`Body says: ${res.value}`);
  });
  console.log('End of step before we print what Body says');
});

Then(/^playground WRONG asynchrony with Nightwatch 3$/, async () => {
  // This specific case goes wrong on new Nightwatch
  console.log('Wrong way: Do asynchronous calls on callbacks (with async/await). Gives a Timeout.');
  await client.waitForElementPresent('body', 5000, true, async () => {
    console.log('Start of wait for element');
    await client.waitForElementPresent('body', 5000); // Finds the element but does a Timeout
    console.log('End of wait for element');
  });
  console.log('End of step');
});

Then(/^playground WRONG asynchrony with Nightwatch 4$/, () => {
  console.log('Wrong way: Do asynchronous calls on callbacks (with no async/await)');
  client.waitForElementPresent('body', 5000, true, () => {
    console.log('This is executed after the step is finished');
    client.waitForElementNotPresent('body', 5000);
  });
  console.log('End of step');
});

Then(/^playground WRONG asynchrony with Nightwatch 5$/, async () => {
  // The step fails as it should, but there are issues with the synchrony of the steps in the callback
  console.log('Wrong way: Do asynchronous calls on callbacks (with async/await only on the step level)');
  await client.waitForElementPresent('body', 5000, true, () => {
    client.waitForElementNotPresent('body', 5000);
    console.log('THIS SHOULD NOT BE PRINTED!');
  });
  console.log('End of step');
});
