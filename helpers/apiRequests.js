const request = require('supertest');
const { performance } = require('perf_hooks');
const fs = require('fs');

const pathLog = 'api-log.txt';

const printTime = (totalTime) => {
  if (!totalTime) return '';
  let roundTime = totalTime / 1000;
  if (roundTime < 10) roundTime = Math.round(roundTime * 100) / 100;
  else roundTime = Math.round(roundTime);
  return `\ntime: ${roundTime}s`;
};

fs.access(pathLog, fs.F_OK, (err) => {
  if (!err) {
    fs.unlink(pathLog, (err2) => {
      if (err2) throw err2;
    });
  }
});

const apiRequests = {
  logRequest: (method, url, headers, body) => {
    const textToAdd = `method: ${method}\nurlSent: ${url}\nheaders: ${JSON.stringify(
      headers,
    )}\nbody: ${JSON.stringify(body)}\n`;

    fs.appendFile(pathLog, textToAdd, (err) => {
      if (err) throw err;
    });
  },

  logResponse: (response, totalTime) => {
    fs.appendFile(
      pathLog,
      `statusCode: ${response.statusCode}\nresponse: ${response.text}${printTime(totalTime)}\n\n`,
      (err) => {
        if (err) throw err;
      },
    );
  },

  logResponseFailure: (error, response, totalTime) => {
    fs.appendFile(
      pathLog,
      `errorMessage: ${error.message}${response ? `\nresponse: ${response.text}` : ''}${printTime(
        totalTime,
      )}\n\n`,
      (err) => {
        if (err) throw err;
      },
    );
  },

  get: (baseUrl, path, headers, expect) => {
    apiRequests.logRequest('GET', `${baseUrl}${path}`, headers, '');
    const startTime = performance.now();

    return new Promise((resolve, reject) => {
      request(baseUrl)
        .get(path)
        .set(headers)
        .expect(expect)
        .end((err, res) => {
          if (err) {
            if (err.rawResponse) {
              apiRequests.logResponse(err, performance.now() - startTime);
              resolve(err);
            } else {
              apiRequests.logResponseFailure(err, res, performance.now() - startTime);
              reject(err);
            }
          } else {
            apiRequests.logResponse(res, performance.now() - startTime);
            resolve(res);
          }
        });
    });
  },
  post: (baseUrl, path, body, headers, expect) => {
    apiRequests.logRequest('POST', `${baseUrl}${path}`, headers, body);
    const startTime = performance.now();
    return new Promise((resolve, reject) => {
      request(baseUrl)
        .post(path)
        .set(headers)
        .send(body)
        .expect(expect)
        .end((err, res) => {
          if (err) {
            apiRequests.logResponseFailure(err, res, performance.now() - startTime);
            reject(err);
          } else {
            apiRequests.logResponse(res, performance.now() - startTime);
            resolve(res);
          }
        });
    });
  },
};

module.exports = apiRequests;
