//#region MenuScrollHandler
var SubMenuHandler = {
    $submenus: null,
    init: function() {
        //if (!ScreensizeHandler.isBigScreen) return;
        //var $subMenus = $('.page-header li.has-child');
        var _submenus = document.querySelectorAll('.page-header li.has-child');
        if (_submenus === null) return;

        this.$submenus = $(_submenus);

        this.positionSubmenus();
        $(window).on('resize', this.positionSubmenus);
    },
    positionSubmenus: function() {
        if (!this.$submenus) return;
        this.$submenus.each(function() {
            var $this = $(this);
            var $subMenu = $(this.querySelector('.submenu'));
            var marginLeft = $this.offset().left;
            $subMenu.css({ 'left': -(marginLeft) });
            var $subMenuContent = $(this.querySelector('.submenu-content'));
            var contentMargin = (marginLeft) + ($this.width() / 2) - ($subMenuContent.width() / 2);
            if(contentMargin < 40) contentMargin = 40;
            else if(contentMargin + $subMenuContent.width() > $(window).width()) contentMargin = $(window).width() - $subMenuContent.width() - 40;
            $subMenuContent.css({ 'margin-left': contentMargin });

        });
    }
};
//#endregion

(function() {
    //if (typeof useSubMenus !== 'undefined' && useSubMenus) {
    SubMenuHandler.init();
    //}
})();
