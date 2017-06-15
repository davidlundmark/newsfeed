//#region CarouselHandler
var CarouselHandler = {
    init: function() {
        var $carousel;
        var $this = this;

        var _carousels = document.querySelectorAll('.slick-carousel');
        if (_carousels === null) return;

        $(_carousels).each(function() {
            $carousel = $(this);
            var slidesToShow = $carousel.data('slidesToShow');
            var slidesToScroll = $carousel.data('slidesToScroll');
            var slidesLg = $carousel.data('slidesLg');
            var slidesMd = $carousel.data('slidesMd');
            var slidesSm = $carousel.data('slidesSm');

            if (!slidesLg) slidesLg = slidesToShow;
            if (!slidesMd) slidesMd = slidesLg;
            if (!slidesSm) slidesSm = slidesMd;

            $this.createSlickSlider($carousel, slidesToShow, slidesToScroll, slidesLg, slidesMd, slidesSm);
        });
    },
    createSlickSlider: function($carousel, slidesToShow, slidesToScroll, slidesLg, slidesMd, slidesSm) {
        $carousel.slick({
            dots: true,
            infinite: false,
            speed: 800,
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToScroll,
            //easing: 'easeOutQuad',
            cssEsae: 'ease-out',
            useTransform: true,
            lazyLoad: 'progressive',//'progressive', //'ondemand',
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: slidesLg,
                        slidesToScroll: slidesLg
                            //infinite: true,
                            //dots: true
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: slidesMd,
                        slidesToScroll: slidesMd
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: slidesSm,
                        slidesToScroll: slidesSm
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
        //$carousel.slick('reinit');
    }
};
//#endregion

(function () {
    //Slick carousel
    if (typeof useCarousel !== 'undefined' && useCarousel) {
        require('../lib/slick.js');
        CarouselHandler.init();
    }
})();
