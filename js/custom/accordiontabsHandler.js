//#region AccordionTabHandler
var AccordionTabsHandler = {
    items: [],
    init: function() {
        var _accordiontabs = document.querySelectorAll('.accordion-tabs');
        var _triggers = $(_accordiontabs).find('.accordion-trigger');
        if (_triggers === null) return;

        $.each($(_accordiontabs), function(i, item) {
            $(item).find('> li:first-child').addClass('is-expanded').find('.accordion-content').show();
        });

        $(_triggers).on('click', function(e) {
            var $this = $(this);
            var $accordiontabs = $(this).closest('.accordion-tabs');

            $.each($accordiontabs, function(i, item) {
                $(item).find('> li').removeClass('is-expanded').find('.accordion-content').hide();
            });

            $this.parent().addClass('is-expanded').find('.accordion-content').show();
            return false;
        });

    }
};
//#endregion

(function() {
    if (typeof useAccordionTabs !== 'undefined' && useAccordionTabs) {
        AccordionTabsHandler.init();
    }
})();
