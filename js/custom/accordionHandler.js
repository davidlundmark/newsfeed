//#region AccordionHandlerZ
var AccordionHandler = {
    init: function() {
        var _accordion = document.querySelectorAll('.accordion');
        var _triggers = $(_accordion).find('.accordion-trigger > .icon-container');
        if (_triggers === null) return;

        $(_triggers).on('click', function(e) {
            var $this = $(this).parent();
            var $parent = $this.parent();
            var $submenu = $parent.find('> .submenu');
            $this.trigger('resize-start');
            $parent.toggleClass('is-expanded');

            $submenu.stop().slideToggle(300, 'easeOutSine', function() {
                if (!$parent.hasClass('is-expanded')) {
                    var $submenus = $submenu.find('.is-expanded');
                    $submenus.removeClass('is-expanded');
                    $submenus.find('> .submenu').slideUp(0);
                }

                $this.trigger('resize-end');
            });

            //e.preventDefault(); 
            return false; 
        });

    }
};
//#endregion

(function () {
    if (typeof useAccordion !== 'undefined' && useAccordion) {
        AccordionHandler.init();
    }
})();
