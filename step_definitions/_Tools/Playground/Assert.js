/* eslint-disable no-console */
const { client } = require('nightwatch-api');
const { Then } = require('cucumber');
const { assert } = require('chai');

Then(/^playground GOOD chai assert$/, () => {
  // Chai's assert is synchronous, therefore no need of async/await
  console.log('1st assert');
  assert.equal(2, 2);
  console.log('2nd assert');
  assert.equal(3, 4);
  console.log('3rd assert'); // not printed beacuse previous assert failed
});

Then(/^playground GOOD nightwatch assert$/, async () => {
  // Nightwatch's assert is asynchronous, therefore we need to use async/await
  console.log('1st assert');
  await client.assert.equal(2, 2);
  console.log('2nd assert');
  await client.assert.equal(3, 4);
  console.log('3rd assert'); // not printed beacuse previous assert failed
});

Then(/^playground WRONG nightwatch assert$/, () => {
  console.log('1st assert');
  client.assert.equal(2, 2);
  console.log('2nd assert');
  client.assert.equal(3, 4);
  console.log('3rd assert'); // printed because we didn't await the asynchronous call to finish
  // The step gives and OK before we get the failure of the assert
});
