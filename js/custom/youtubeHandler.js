//#region YoutubeHandler
var YoutubeHandler = {
    init: function(Id, youtubeId) {
        var player = new YT.Player(Id, {
            height: '390',
            width: '640',
            videoId: youtubeId,
            playerVars: {
                'autoplay': 0,
                'rel': 0,
                'showinfo': 0
            },
            events: {
                //'onReady': onPlayerReady,
                //'onStateChange': onPlayerStateChange
            }
        });
    }
};
//#endregion


(function() {
    if (typeof useYoutube !== 'undefined' && useYoutube) {
        var _youtubevideos = document.querySelectorAll('.youtube-player');
        if (_youtubevideos !== null) {


            window.onYouTubePlayerAPIReady = function() {
                $(_youtubevideos).each(function(i) {
                    var $this = $(this);
                    var youtubeId = $this.data('id');
                    $this.attr('id', youtubeId + i); //i is added if video is dubplicated on site
                    var youtubeHandler = $.extend({}, YoutubeHandler);
                    youtubeHandler.init(youtubeId + i, youtubeId);
                });
            }

            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }
})();
