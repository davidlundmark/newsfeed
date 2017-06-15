//#region AudioHandler
var AudioHandler = {
    init: function() {
        // Note: Disabling and enabling to make bootstrap field validation work
        $('.audio').click(function() {
            var $this = $(this);
            var audio = new Audio($this.data('audio'));
            audio.play();
        });
    }
};
//#endregion

(function() {
    if (typeof useAudio !== 'undefined' && useAudio) {
        AudioHandler.init();
    }
})();
