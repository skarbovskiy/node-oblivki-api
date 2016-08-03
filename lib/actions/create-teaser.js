'use strict';
const Promise = require('bluebird');
const getImage = Promise.promisify(require('request').defaults({encoding: null}).get);
const Jimp = require("jimp");

const maxLength = 156000;
const request = require('../request');

module.exports = (data) => {
  return getImage(data.imageUrl).then(result => {
    let buffer = Buffer.from(result.body, 'binary');
    return Promise.props({length: buffer.length, image: Jimp.read(buffer)});
  })
    .then(data => {
      let image = data.image;
      if (data.length <= maxLength) {
        return Promise.fromCallback((callback) => image.getBuffer(image._originalMime, callback));
      }
      image.quality(99);
      return image;
    })
    .then(image => Promise.fromCallback((callback) => image.getBuffer(Jimp.MIME_JPEG, callback)))
    .then(image => {
      data.uploaded = image;
      return request('teaser/create', data);
    });
}
