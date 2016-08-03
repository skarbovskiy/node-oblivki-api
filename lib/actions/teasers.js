'use strict';

const request = require('../request');

module.exports = (campaignId = '') => {
  return request(`teasers?campaignId=${campaignId}&status=${status}`);
}
