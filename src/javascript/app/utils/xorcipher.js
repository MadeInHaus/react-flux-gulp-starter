  "use strict";

  // Source: https://gist.github.com/sukima/5613286

  var Base64 = require('app/utils/base64'),
      _ = require('underscore');

  function keyCharAt(key, i) {
      return key.charCodeAt(i % key.length);
  }

  function xor_encrypt(key, data) {
      return _.map(data, function(c, i) {
          return String.fromCharCode(c.charCodeAt(0) ^ keyCharAt(key, i));
      }).join('');
  }

  function xor_decrypt(key, data) {
      return _.map(data, function(c, i) {
          return String.fromCharCode(c.charCodeAt(0) ^ keyCharAt(key, i));
      }).join('');
  }

  exports.encode = function(key, data) {
      data = xor_encrypt(key, data);
      return Base64.encode(data);
  };

  exports.decode = function(key, data) {
      data = Base64.decode(data);
      return xor_decrypt(key, data);
  };

  module.exports = exports;
