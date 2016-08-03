'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const urlService = require('url');

const sessionData = require('./session-data');

module.exports = (url, body) => {
  if (!url) {
    return Promise.reject(new Error('no url specified'));
  }
  url = urlService.parse(url, true);
  delete url.search;
  if (sessionData.accessToken) {
    url.query['access-token'] = sessionData.accessToken;
  }
  let method = body ? 'postAsync' : 'getAsync';
  let payload = {
    url: `${sessionData.baseUrl}${urlService.format(url)}`
  };
  if (method === 'postAsync') {
    payload.formData = body;
  }
  return request[method](payload).then((res) => {
    let response = null;
    let jsonParseError = false;
    try {
      response = JSON.parse(res.body);
    } catch (e) {
      jsonParseError = true;
    }
    if (jsonParseError || res.statusCode !== 200) {
      let error = new Error(response.message || 'unhandled error');
      error.status = res.statusCode;
      error.body = res.body;
      throw error;
    }
    return response;
  });
}
