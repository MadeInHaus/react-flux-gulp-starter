var player = {
    playVideo: function(container, config) {
        if (typeof(window.YT) == 'undefined' || typeof(window.YT.Player) == 'undefined') {
            window.onYouTubeIframeAPIReady = function() {
                return player.loadPlayer(container, config);
            };
            $.getScript('//www.youtube.com/iframe_api');
        } else {
            return player.loadPlayer(container, config);
        }
    },

    loadPlayer: function(container, config) {
        return new window.YT.Player(container, config);
    }
};

module.exports = player;
