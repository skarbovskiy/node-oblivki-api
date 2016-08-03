'use strict';
const request = require('../request');
const sessionData = require('../session-data');
module.exports = () => {
  if (!sessionData.accessToken) {
    throw new Error('not autorized to logout');
  }
  return request('auth/logout', {'access-token': sessionData.accessToken});
};
