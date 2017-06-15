var vex = null;
var Handlebars = null;

//#region VexHandler
var VexHandler = {
    id: null,
    openVex: function(contentEl, setHeight) {
        var marginTop = Math.round(contentEl.offsetHeight / 2);
        contentEl.style.marginTop = -(marginTop + 40) + 'px';
        contentEl.style.marginLeft = -(Math.round(contentEl.offsetWidth / 2)) + 'px';
        $(contentEl).animate({ 'marginTop': -marginTop }, 500);

        if (setHeight) {
            contentEl.style.height = contentEl.offsetHeight + 'px';
            contentEl.style.width = contentEl.offsetWidth + 'px';
            contentEl.className += contentEl.className ? ' open' : 'open';
        }

        if (this.id == 'login') {
            $('#login-loader').height($('#login-button').height());
        }

        var _this = this;
        $(window).on('resize.vex', function() {
            $(window).off('resize.vex');
            vex.closeAll();
        });
    },
    closeVex: function(contentEl) {
        $(window).off('resize.vex');
        var marginTop = parseInt(contentEl.style.marginTop, 10) - 40;
        $(contentEl).animate({ 'marginTop': marginTop + 'px' }, 500);
    },
    setupModal: function(id) {
        this.id = id;
        var _triggers = document.querySelectorAll('.modal-trigger[data-modal-template="' + id + '"]');
        if (_triggers === null) return;

        var _this = this;

        var template = document.querySelector('.' + id + '-modal');

        template.remove();
        $(template).removeClass('hide');

        $(_triggers).on('click', function(e) {
            var $this = $(this);

            vex.defaultOptions.className = 'modal-' + id + '';

            vex.dialog.defaultOptions.buttons = [];
            vex.dialog.confirm({
                unsafeMessage: template,
                afterOpen: function() {
                    //_this.openVex(this.contentEl, true);
                    _this.openVex(this.contentEl);
                },
                beforeClose: function() {
                    _this.closeVex(this.contentEl);
                },
                callback: function(value) {
                    if (value) {
                        //console.log('Successfully destroyed the planet.')
                    } else {
                        //console.log('Chicken.')
                    }
                }
            });

            return false;
        });
    }
};
//#endregion

(function() {
    //
    if (typeof useModal !== 'undefined' && useModal) {
        vex = require('vex');
        vex.registerPlugin(require('vex-dialog'));
        vex.dialog.defaultOptions.showCloseButton = true;

        if (typeof useModalLogin !== 'undefined' && useModalLogin) {
            var loginVexHandler = $.extend({}, VexHandler);
            loginVexHandler.setupModal('login');
        }

        if (typeof useModalAccount !== 'undefined' && useModalAccount) {
            var accountVexHandler = $.extend({}, VexHandler);
            accountVexHandler.setupModal('account');
        }
    }
})();
