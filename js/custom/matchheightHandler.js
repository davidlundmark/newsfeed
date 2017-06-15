(function() {
    require('../lib/jquery.matchHeight.js');
    //Grid same height
    //if (typeof useGridSameHeight !== 'undefined' && useGridSameHeight) {
        if ($('html').hasClass('ie-old')) { //only do this for IE <= 9
            var _sameheight = document.querySelectorAll('.row.same-height');
            if (_sameheight !== null) {
                $(_sameheight).each(function() {
                    $(this).find('> .column').matchHeight();
                });
                //$(_sameheight).find('> .column').matchHeight();
                //$('.same-height > .column').matchHeight();
            }
        }
    //}

    if (typeof useSlickSameHeight !== 'undefined' && useSlickSameHeight) {
        var _texts = document.querySelectorAll('.slick-carousel .title.match-height');
        if (_texts !== null) {
            $(_texts).matchHeight();
        }

        var _cardTexts = document.querySelectorAll('.slick-carousel .card-text.match-height');
        if (_cardTexts !== null) {
            $(_cardTexts).matchHeight();
        }

    }

    var _texts = document.querySelectorAll('.same-height .match-height');
    if (_texts !== null) {
        $(_texts).matchHeight();
    }

    var _texts2 = document.querySelectorAll('.same-height .match-height-title');
    if (_texts2 !== null) {
        $(_texts2).matchHeight();
    }

    var _texts3 = document.querySelectorAll('.same-height .match-height-text');
    if (_texts3 !== null) {
        $(_texts3).matchHeight();
    }

})();
