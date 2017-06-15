//#region ImagemapHandler
var ImagemapHandler = {
    currentLan: null,
    init: function() {
        var _imageMap = document.getElementById('image-map');
        if (_imageMap === null) return;

        var _paths = _imageMap.querySelectorAll('svg > path');
        var _texts = _imageMap.querySelectorAll('.lan-text');

        var _this = this;

        $(_paths).on('click', function(e) {
            var _clickedLan = document.getElementById(this.getAttribute('id') + '_text');
            if (_this.currentLan == _clickedLan) return;
            if (_this.currentLan) $(_this.currentLan).fadeOut();
            $(_paths).removeClass('open');
            _this.currentLan = _clickedLan;
            $(this).addClass('open');
            $(_this.currentLan).fadeIn(function() {
                if (ScreensizeHandler.isLgOrSmaller) {
                    $('html, body').animate({
                        scrollTop: $(_this.currentLan).offset().top - 40
                    }, 600);
                }
            });


        });
    }
};
//#endregion

(function() {
    if (typeof useImageMap !== 'undefined' && useImageMap) {
        ImagemapHandler.init();
    }
})();
