'use strict';
const request = require('../request');
const sessionData = require('../session-data');

module.exports = (login, password) => {
  return request('auth/login', {login, password})
    .then((res) => {
      sessionData.accessToken = res['access-token'];
      return sessionData.accessToken;
    })
};
