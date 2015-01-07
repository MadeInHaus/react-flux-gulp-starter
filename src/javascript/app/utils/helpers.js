var $ = require('jquery'),
    $window = $(window),
    $body = $('body'),
    $main = $('.main-content'),
    loader = $('.radial-progress'),
    constants = require('./constants'),
    channels = require('../channels');

exports.preloadImages = function(el, event) {
    var self = this;
    this.percentage = 0;

    el.waitForImages(function() {
        el.removeClass(constants.LOADING_IMAGES_CLASS);
        el.addClass(constants.READY_CLASS);
        channels.globalChannel.trigger(event);
        self.setWindowHeight();
        resetLoader();
    }, function(loaded, count, success) {
        self.percentage = Math.floor((loaded / count) * 100);
        updatePercentage(self.percentage);
    }, true);

    function updatePercentage(percentage) {
        loader.attr('data-progress', percentage);
    }

    // Start progress at '0' on next iteration
    function resetLoader() {
        setTimeout(function() {
            updatePercentage(0);
        }, 2000);
    }
};

exports.setWindowHeight = function(target) {
    var winHeight = Modernizr.touch ? window.screen.availHeight : window.innerHeight;
    $(target).css('height', winHeight);
};

exports.scrollTo = function(target, jump) {

    var targetOffset = $(target).offset().top;

    if (jump || Modernizr.touch) {
        $body.scrollTop(targetOffset);
    } else {
        $body.velocity('scroll', {
            duration: 600,
            easing: 'easeInOutCubic',
            offset: targetOffset
        });
    }

};

exports.setVideoSize = function(videoContainer, mode) {
    var windowW = $window.width(),
        windowH = $window.height() - 60,
        windowAspect = windowW / windowH,
        mediaAspect = 16 / 9,
        cssProps;

    if (mode === 'fullscreen') {

        // taller
        if (windowAspect < mediaAspect) {
            cssProps = {
                width: (windowH * (16 / 9)),
                height: windowH,
                top: 0,
                left: -(windowH * mediaAspect - windowW) / 2
            };
            // wider
        } else {
            cssProps = {
                width: windowW,
                height: (windowW * (9 / 16)),
                top: -(windowW / mediaAspect - windowH) / 2,
                left: 0
            };
        }
    } else {
        var containerW = $main.width() * 0.7,
            containerH = $main.height() * 0.7,
            containerAspect = containerW / containerH;

        if (containerAspect < mediaAspect) {
            cssProps = {
                width: containerW,
                height: containerW * (9 / 16)
            };
        } else {
            cssProps = {
                width: containerH * (16 / 9),
                height: containerH
            };
        }
    }

    videoContainer.css(cssProps);
};

exports.setBackgroundImageSize = function(container) {

    container.each(function(i) {
        var path = $(this);
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        var remainingH = 0;
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;

        if (contW > imgW) {
            imgW = contW;
            imgH = imgW / ratio;
        }

        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
};

exports.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = exports;
