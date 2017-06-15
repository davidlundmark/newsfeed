//#region MobilemenuHandler
var MobileMenuHandler =  {
    lastScrollPos: 0,
    init: function() {
        var _menutoggle = document.querySelectorAll('.menu-toggle');
        if (_menutoggle === null) return;

        $(_menutoggle).on('click', function(e) {
            e.stopPropagation();
 
            var $this = $(this);
            $this.toggleClass('open');
            $this.find('.burger-container').toggleClass('active');

            var $target = $($this.data('target'));
            $target.toggleClass('open');

            $('.page-header').toggleClass('menu-open')
            $('body').toggleClass('no-scroll');

            var $content = $target.find('.content');
            var $blocker = $target.find('.blocker');
            var $triggers = $content.find('.accordion-trigger');

            if ($target.hasClass('open')) { //menu is open
                MobileMenuHandler.checkNavHeight($target);

                $triggers.on('resize-start', function() {
                    $blocker.height(0);
                });

                $triggers.on('resize-end', function() {
                    $blocker.height($content.outerHeight());
                    MobileMenuHandler.checkNavHeight($target);
                });

                $blocker.on('click touchmove', function(e) {
                    if (e.type == 'click') $this.trigger('click');
                    return false;
                });

                $(window).on('resize.mobilemenu', function() {
                    if(ScreensizeHandler.isBigScreen) {
                        $this.trigger('click');
                    }
                });
            } else {
                $blocker.off('click touchmove');
                $triggers.off('resize-start resize-end');
                MobileMenuHandler.checkNavHeight($target, true); //reset event listeners
                $(window).off('resize.mobilemenu');
            }
        });
    },
    checkNavHeight: function($elem, reset) {
        var $content = $elem.find('.content');

        if (reset) {
            $content.off('touchmove touchstart');
            return;
        }

        var $menuHeight = $elem.find('.accordion').outerHeight();
        var $windowHeight = $(window).outerHeight() - $('.page-header').outerHeight();

        $content.off('touchmove touchstart');
        var scrollTop = 0;
        if ($menuHeight > $windowHeight) {
            //console.log('enable scroll');
            scrollTop = $(window).scrollTop();
            $elem.addClass('scroll');
            $content.on('touchstart touchmove', function(e) {
                $(window).scrollTop(scrollTop);
            });
        } else {
            //console.log('disable scroll');
            $elem.removeClass('scroll');
            $content.on('touchmove', function(e) {
                return false;
            });
        }
    }

};
//#endregion

(function () {
    if (typeof useMenuToggle !== 'undefined' && useMenuToggle) {
        MobileMenuHandler.init();
    }
})();
    