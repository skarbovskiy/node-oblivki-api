'use strict';

const request = require('../request');

module.exports = (status = '') => {
  return request(`campaigns?status=${status}`);
}
