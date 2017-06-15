//#region InformationHandler
var InformationHandler = {
    init: function() {
        this.headingsInfo();
        this.paragraphInfo();
        this.colorsInfo();
        this.logoInfo();
    },

    logoInfo: function() {
        var $logo = $('#logo');
        $logo.find('.logo-path').text($logo.find('.default > img').attr('src'));
        $logo.find('.logo-inverted-path').text($logo.find('.inverted > img').attr('src'));
    },

    headingsInfo: function() {
        var $headings = $('#headings');
        var $info = $headings.find('.information');
        var $content = $headings.find('.content');

        var $h1 = $content.find('h1').first();

        $info.find('.font-family').text(this.getCSSValue($h1, 'font-family'));
        $info.find('.font-weight').text(this.getCSSValue($h1, 'font-weight'));

        $('.h1-font-size').text(this.getCSSValue($h1, 'font-size'));
        $('.h2-font-size').text(this.getCSSValue($content.find('h2').first(), 'font-size'));
        $('.h3-font-size').text(this.getCSSValue($content.find('h3').first(), 'font-size'));
        $('.h4-font-size').text(this.getCSSValue($content.find('h4').first(), 'font-size'));
        $('.h5-font-size').text(this.getCSSValue($content.find('h5').first(), 'font-size'));
        $('.h6-font-size').text(this.getCSSValue($content.find('h6').first(), 'font-size'));
    },

    paragraphInfo: function() {
        var $paragraph = $('#paragraph');
        var $info = $paragraph.find('.information');

        var $p = $('p').first();
        $info.find('.font-family').text(this.getCSSValue($p, 'font-family'));
        $info.find('.font-size').text(this.getCSSValue($p, 'font-size'));
        $info.find('.font-weight').text(this.getCSSValue($p, 'font-weight'));
    },

    colorsInfo: function() {
        var $colors = $('#colors');

        this.setColorsInfo($colors.find('.primary-color'));
        this.setColorsInfo($colors.find('.secondary-color'));
        this.setColorsInfo($colors.find('.tertiary-color'));
        this.setColorsInfo($colors.find('.primary-background-color'));
        this.setColorsInfo($colors.find('.secondary-background-color'));
        this.setColorsInfo($colors.find('.tertiary-background-color'));
        this.setColorsInfo($colors.find('.primary-font-color'));
        this.setColorsInfo($colors.find('.secondary-font-color'));
    },

    setColorsInfo: function($color) {
        var $colorBg = this.getCSSValue($color.siblings('.color'), 'background-color');
        $color.find('.color-rgb').text($colorBg.replace('rgb(', '').replace(')', ''));
        $color.find('.color-hex').text(this.rgbToHex($colorBg));
    },

    getCSSValue: function($elem, $value) {
        return $elem.css($value);
    },

    rgbToHex: function(color) {
        if (color.charAt(0) === "#") {
            return color;
        }

        var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
            r = parseInt(nums[2], 10).toString(16),
            g = parseInt(nums[3], 10).toString(16),
            b = parseInt(nums[4], 10).toString(16);

        return "#" + (
            (r.length == 1 ? "0" + r : r) +
            (g.length == 1 ? "0" + g : g) +
            (b.length == 1 ? "0" + b : b)
        );
    }

};
//#endregion

(function () {
    InformationHandler.init();
})();