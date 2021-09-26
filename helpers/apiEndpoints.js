const apiEndpoints = {
  baseUrl: {
    jsonplaceholder: 'https://jsonplaceholder.typicode.com',
  },
  path: {
    posts: '/posts',
    post: (id) => `/posts/${id}`,
  },
};

module.exports = apiEndpoints;
