'use strict';

const sessionData = require('./lib/session-data');
const actions = require('./lib/actions');
const login = require('./lib/actions/login');
module.exports = (email, password) => {
  return (action, body) => {
    if (!sessionData.accessToken) {
      return login(email, password).then(() => {
        return actions[action](body);
      });
    } else {
      return actions[action](body);
    }
  }
}
