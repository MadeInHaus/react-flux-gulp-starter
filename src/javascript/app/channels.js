Backbone = require('backbone');
Backbone.Radio = require('backbone.radio');

module.exports.globalChannel = Backbone.Radio.channel('global');
module.exports.soundChannel = Backbone.Radio.channel('sound');
module.exports.userChannel = Backbone.Radio.channel('user');
module.exports.videoChannel = Backbone.Radio.channel('video');
module.exports.backgroundChannel = Backbone.Radio.channel('background');
