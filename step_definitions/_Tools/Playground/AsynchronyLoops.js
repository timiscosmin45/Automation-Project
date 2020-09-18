/* eslint-disable no-console */
const { client } = require('nightwatch-api');
const { Then } = require('cucumber');

const resolveAfter2Seconds = (x) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
};

const showNumberAsync = async (x) => {
  console.log(await resolveAfter2Seconds(x));
};

Then(/^playground GOOD asynchrony with a js iterator with custom function$/, async () => {
  // Same can be applied to other js iterators (while, for, for...in, ...)
  for (const index of [1, 2, 3]) {
    await showNumberAsync(index);
  }
});

Then(/^playground GOOD asynchrony with a js iterator$/, async () => {
  // Same can be applied to other js iterators (while, for, for...in, ...)
  for (const index of [1, 2, 3]) {
    // eslint-disable-next-line no-await-in-loop
    await client.pause(index * 1000).waitForElementPresent('div', 2000, () => {
      console.log(`Iteration ${index}`);
    });
  }
});

Then(/^playground WRONG asynchrony with Array iterator$/, async () => {
  // There is no way to do good asynchrony with Array iterators (forEach, map, filter, reduce, ...)
  // Although we use async/await, it doesn't wait
  await [1, 2, 3].forEach(async (index) => {
    await client.pause(index * 1000).waitForElementPresent('div', 2000, () => {
      console.log(`Iteration ${index}`);
    });
  });
});
