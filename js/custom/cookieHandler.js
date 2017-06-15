//#region CookieHandler
var CookieHandler = {
    init: function() {
        this.checkCookie();
    },

    checkCookie: function() {
        var _this = this;
        var cookie = this.readCookie('cookieAccepted');
        var _cookie = document.querySelector('.cookie');

        if (_cookie === null) return;

        var $cookie = $(_cookie);

        if (!cookie) {
            $cookie.removeClass('hide');
            $(_cookie.querySelector('.accept')).on('click', function(e) {
                _this.createCookie('cookieAccepted', 'true', 21);
                _this.checkCookie();
                return false;
            });
        } else {
            if (!$cookie.hasClass('hide')) {
                $cookie.slideToggle();
                //$cookie.addClass('hide');
            }
        }
    },

    createCookie: function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    eraseCookie: function(name) {
        createCookie(name, "", -1);
    }
};
//#endregion

(function () {
    if (typeof useCookie !== 'undefined' && useCookie) {
        CookieHandler.init();
    }
})();
