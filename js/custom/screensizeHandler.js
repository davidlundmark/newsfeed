//#region ScreensizeHandler
ScreensizeHandler = {
    screenSize: '',
    stateIndicator: null,
    isBigScreen: false,
    isXlScreen: false,
    isSmallScreen: false,
    isLgOrSmaller: false,
    isMdOrSmaller: false,
    isPhOrSmaller: false,
    isSmOrSmaller: false,
    init: function() {
        this.stateIndicator = document.createElement('div');
        this.stateIndicator.className = 'state-indicator';
        document.body.appendChild(this.stateIndicator);
        this.screenSize = this.getDeviceState();

        $(window).resize(function() {
            var currentScreenSize = this.getDeviceState();
            if (currentScreenSize != this.screenSize) {
                this.screenSize = currentScreenSize;
            }
        }.bind(this));
    },
    getDeviceState: function() {
        var index = parseInt(window.getComputedStyle(this.stateIndicator).getPropertyValue('z-index'), 10);

        var states = {
            1: '',
            2: 'xl',
            3: 'lg',
            4: 'md',
            5: 'ph',
            6: 'sm'
        };

        var state = states[index];

        this.isBigScreen = false;
        this.isXlScreen = false;
        this.isSmallScreen = false;
        this.isLgOrSmaller = false;
        this.isMdOrSmaller = false;
        this.isPhOrSmaller = false;
        this.isSmOrSmaler = false;

        switch (state) {
            case '':
                this.isBigScreen = true;
                break;
            case 'xl':
                this.isBigScreen = true;
                this.isXlScreen = true;
                break;
            case 'lg':
                this.isLgOrSmaller = true;
                this.isSmallScreen = true;
                break;
            case 'md':
                this.isLgOrSmaller = true;
                this.isMdOrSmaller = true;
                this.isSmallScreen = true;
                break;
            case 'ph':
                this.isLgOrSmaller = true;
                this.isMdOrSmaller = true;
                this.isPhOrSmaller = true;
                this.isSmallScreen = true;
                break;
            case 'sm':
                this.isLgOrSmaller = true;
                this.isMdOrSmaller = true;
                this.isPhOrSmaller = true;
                this.isSmOrSmaller = true;
                this.isSmallScreen = true;
                break;
        }

        return state;
    }
};
//#endregion

(function() {
    ScreensizeHandler.init();
})();
