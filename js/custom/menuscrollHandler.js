    //#region MenuScrollHandler
var MenuScrollHandler = {
    $pageheader: null,
    scrolledClass: 'scrolled',
    hideClass: 'slide-up',
    scrolled: false,
    hidden: false,
    senseSpeed: 5,
    offsetTop: 0,
    prevScrollTop: 0,
    timer: null,
    $rootMenu: null,
    $subwebMenu: null,
    rootMenuHidden: false,
    scrollDisabled: false,
    init: function() {
        var _pageheader = document.querySelector('.page-header');
        if (_pageheader === null) return;

        this.$pageheader = $(_pageheader);

        this.$subwebMenu = $(_pageheader.querySelector('.subweb-menu'));
        if (this.$subwebMenu.length) this.$rootMenu = $(_pageheader.querySelector('.rootweb-menu'));

        // if (window.ScreensizeHandler.isBigScreen && document.querySelector('.flexslider') !== null) {
        //     //if (window.ScreensizeHandler.isBigScreen && $('.flexslider').length) {
        //     this.offsetTop = 168;
        // } else {
        //     //this.offsetTop = this.$pageheader.outerHeight();
        //     this.offsetTop = 168;
        // }
        
        this.offsetTop = this.$pageheader.outerHeight()*2;

        $(window).scroll(function() {
            this.handleTopMenu();
        }.bind(this));

        //this.handleTopMenu();
        //if (this.$subwebMenu.length) this.timer = setTimeout(this.hideRootMenu.bind(this), 3000);
    },
    handleTopMenu: function() {
        var scrollTop = $(window).scrollTop();
        
        // if (this.$subwebMenu.length) {
        //     if (scrollTop <= 0) {
        //         this.showRootMenu();
        //     } else {
        //         this.hideRootMenu();
        //     }
        // }

        if (this.$pageheader.hasClass('menu-open') || (this.scrollDisabled && scrollTop > 168)) return;

        if (scrollTop < 0) scrollTop = 0;

        //change bg color
        if (scrollTop >= this.offsetTop) {
            if (!this.scrolled) {
                this.scrolled = true;
                this.$pageheader.addClass(this.scrolledClass);
            }
        } else {
            if (this.scrolled) {
                this.scrolled = false;
                this.$pageheader.removeClass(this.scrolledClass);
            }
        }

        //hide show menu
        if (scrollTop > 168 && scrollTop >= this.offsetTop) {
            var bottomPos = scrollTop;
            if (ScreensizeHandler.isBigScreen) {
                bottomPos = scrollTop - this.senseSpeed;
            }
            var topPos = scrollTop;
            if (ScreensizeHandler.isBigScreen) {
                topPos = scrollTop + this.senseSpeed;
            }
            if (bottomPos > this.prevScrollTop) {
                if (!this.hidden) {
                    this.hidden = true;
                    this.$pageheader.addClass(this.hideClass);
                    this.disableScroll();
                }
            } else if (topPos < this.prevScrollTop) {
                if (this.hidden) {
                    this.hidden = false;
                    this.$pageheader.removeClass(this.hideClass);
                    this.disableScroll();
                }
            }
        } else {
            if (this.hidden) {
                this.hidden = false;
                this.$pageheader.removeClass(this.hideClass);
            }
        }
        this.prevScrollTop = scrollTop;
    },
    disableScroll: function() {
        this.scrollDisabled = true;
        setTimeout(function() {
            this.scrollDisabled = false;
        }.bind(this), 400);
    },
    hideRootMenu: function() {
        if (!ScreensizeHandler.isBigScreen || this.rootMenuHidden) return;
        this.rootMenuHidden = true;
        clearTimeout(this.timer);
        this.$rootMenu.stop(true, false).slideUp();
        //this.$rootMenu.addClass(this.hideClass);

        if ($(window).scrollTop() == 0) $(window).scrollTop(1);
    },
    showRootMenu: function() {
        if (!ScreensizeHandler.isBigScreen || !this.rootMenuHidden) return;
        this.rootMenuHidden = false;
        this.$rootMenu.stop(true, false).slideDown();
    }
};
//#endregion

$(window).on('load', function() {
    if (typeof useMenuScrollEffect !== 'undefined' && useMenuScrollEffect) {
        MenuScrollHandler.init();
    }
});
