const { expect } = require('chai');
const { Then } = require('cucumber');
const { apiRequests, apiEndpoints } = require('../helpers');

const headers = () => ({
  'Content-type': 'application/json; charset=UTF-8',
});

Then(/^check that all Posts response is working correctly$/, async () => {
  const baseUrl = apiEndpoints.baseUrl.jsonplaceholder;
  const path = apiEndpoints.path.posts;

  const { body } = await apiRequests.get(baseUrl, path, headers(), 200);
  expect(body).to.not.be.empty;
});

Then(/^check that Posts response with a valid post is working correctly$/, async () => {
  const baseUrl = apiEndpoints.baseUrl.jsonplaceholder;
  const path = apiEndpoints.path.post('1');

  const { body } = await apiRequests.get(baseUrl, path, headers(), 200);
  expect(body).to.not.be.empty;
  expect(body.id).to.equal(1);
  expect(body.title).to.equal(
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  );
});

Then(/^check that Posts response with an incorrect post is replying as expected$/, async () => {
  const baseUrl = apiEndpoints.baseUrl.jsonplaceholder;
  const path = apiEndpoints.path.post('test');

  await apiRequests.get(baseUrl, path, headers(), 404);
});

Then(/^check that create Posts endpoint is working correctly$/, async () => {
  const baseUrl = apiEndpoints.baseUrl.jsonplaceholder;
  const path = apiEndpoints.path.posts;
  const requestBody = require('../JSONFiles/addPost.json');

  const { body } = await apiRequests.post(baseUrl, path, requestBody, headers(), 201);
  expect(body.title).to.equal(requestBody.title);
  expect(body.body).to.equal(requestBody.body);
  expect(body.userId).to.equal(requestBody.userId);
});
