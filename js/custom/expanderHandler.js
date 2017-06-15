//#region ExpanderHandler
var ExpanderHandler = {
    initialized: null,
    init: function() {
        if (this.initialized) return;
        this.initialized = true;

        var _triggers = document.querySelector('.expander-trigger');
        if (_triggers === null) return;

        $(_triggers).bind('click', function(e) {
            var $expander = $(this).closest('.expander');
            $expander.find('.expander-content').slideToggle(400, 'easeOutSine'); // apply the toggle to the ul
            $expander.toggleClass('is-expanded');
            e.preventDefault();
            return false;
        });

    }
};
//#endregion

(function () {
     if (typeof useExpander !== 'undefined' && useExpander) {
        ExpanderHandler.init();
    }
})();