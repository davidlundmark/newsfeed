(function() {
    //libs
    require('./lib/jquery.easing.1.3.js');
    require('./lib/jquery.matchHeight.js');
    require('./lib/picturefill.js');
    //globals
    require('./custom/screensizeHandler.js');
    //customs
    require('./custom/menuscrollHandler.js');
    require('./custom/mobilemenuHandler.js');
    require('./custom/flexsliderHandler.js');
    require('./custom/accordionHandler.js');
    require('./custom/backgroundimageHandler.js');
    require('./custom/apiHandler.js');
    require('./custom/carouselHandler.js');
    require('./custom/arrowdownHandler.js');
    require('./custom/matchheightHandler.js');
    require('./custom/dekai.js');

    (function() {

        deKai.setupAnchorCards();

        if (typeof useSearchLoadMore !== 'undefined' && useSearchLoadMore) {
            var _loadmore = document.querySelectorAll('.search-result-section .load-more');
            if (_loadmore !== null) {
                $(_loadmore).on('click', function(e) {
                    var $this = $(this);
                    var $parent = $this.parent();
                    $parent.find('.search-item.hide').slice(0, 5).removeClass('hide');
                    if (!$parent.find('.search-item.hide').length) $this.hide();
                    return false;
                });
            }
        }

        deKai.lazyLoad();

    })();

    $(window).on('load', function() {

        if (document.querySelector('.page-slider') === null) {
            fixBodyPadding();

            $(window).resize(function() {
                fixBodyPadding();
            });

            function fixBodyPadding() {
                $('body').css({
                    'padding-top': $('.page-header').outerHeight()
                });
            }
        }

        var headerHeight = $(document.querySelector('.page-header')).outerHeight();
        $('#mobile-menu .content').css({ 'padding-top': headerHeight });

        var _anchorlinks = document.querySelectorAll('a[href*="#"]:not([href="#"])');
        if (_anchorlinks !== null) {
            $(_anchorlinks).click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1500);
                        return false;
                    }
                } else {
                    console.log('The element was not found:', this)
                }
            });
        }
    });

})();
