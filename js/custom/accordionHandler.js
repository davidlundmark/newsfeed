//#region AccordionHandlerZ
AccordionHandler = {
    init: function() {
        var _triggers = document.querySelectorAll('.accordion-trigger');
        if (_triggers === null) return;

        var _content = document.querySelectorAll('.accordion-content');
        $(_content).hide();

        $(_triggers).off('click');
        $(_triggers).on('click', function(e) {
            var $this = $(this);
            var $parent = $(this).parent();
            var $submenu = $parent.find('> .accordion-content');
            $this.trigger('resize-start');
            $parent.toggleClass('is-expanded');

            $submenu.stop().slideToggle(300, 'easeOutSine', function() {
                if (!$parent.hasClass('is-expanded')) {
                    var $submenus = $submenu.find('.is-expanded');
                    $submenus.removeClass('is-expanded');
                }

                $this.trigger('resize-end');
            });

            //e.preventDefault(); 
            return false; 
        });

    }
};
//#endregion

(function() {
    if (typeof useAccordion !== 'undefined' && useAccordion) {
         AccordionHandler.init();
    }
})();
