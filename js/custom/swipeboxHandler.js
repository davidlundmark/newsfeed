require('../lib/jquery.swipebox.js');

//#region SwipeboxHandler
var SwipeboxHandler = {
    $swipebox: null,
    init: function() {
        this.$swipebox = $('.swipebox');
        if (!this.$swipebox.length) return;

        this.$swipebox.swipebox({
            useCSS: true, // false will force the use of jQuery for animations
            useSVG: true, // false to force the use of png for buttons
            hideCloseButtonOnMobile: false, // true will hide the close button on mobile devices
            hideBarsDelay: 3000, // delay before hiding bars on desktop
            videoMaxWidth: 1024, // videos max width
            beforeOpen: function() { $('body').addClass('no-scroll') }, // called before opening
            afterOpen: null, // called after opening
            afterClose: function() { $('body').removeClass('no-scroll') }, // called after closing
            loopAtEnd: false, // true will return to the first image after the last image is reached
            removeBarsOnMobile: false
        });
    }
};
//#endregion

(function() {
    //Lightbox
    if (typeof useLightbox !== 'undefined' && useLightbox) {
        SwipeboxHandler.init();
    }
})();
