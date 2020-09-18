/* eslint-disable no-console */
const { Then } = require('cucumber');

const resolveAfter2Seconds = (x) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
};

const add3NumbersNow = (x) => {
  const a = 1;
  const b = 2;
  return x + a + b;
};

const add3NumbersAsync = async (x) => {
  const a = await resolveAfter2Seconds(1);
  const b = await resolveAfter2Seconds(2);
  return x + a + b;
};

Then(/^playground synchronous code$/, () => {
  // No need of async
  const res = add3NumbersNow(10); // No need of await
  console.log(res);
});

Then(/^playground GOOD asynchrony with custom function$/, async () => {
  console.log('1st way RECOMMENDED');
  const res = await add3NumbersAsync(20);
  console.log(res); // Is executed after the previous call is finished

  console.log('2nd way');
  await add3NumbersAsync(30).then((res) => {
    console.log(res); // Is executed after the call is finished
  });

  console.log('End of step'); // Is executed after the previous call and its callback finish
});

Then(/^playground WRONG asynchrony with custom function 1$/, () => {
  console.log('Wrong way');
  const res = add3NumbersAsync(40); // As there is no await, next step is executed inmediately after this
  console.log(res); // Prints the Promise, not the result
  console.log('End of step');
});

Then(/^playground WRONG asynchrony with custom function 2$/, () => {
  console.log('Wrong way');
  add3NumbersAsync(50).then((res) => {
    console.log(res); // Prints the result after the call is finished, but the step has already ended
  });
  console.log('End of step'); // As there is no await on previous call, this step is executed inmediately after that
});
