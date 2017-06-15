//#region ApiHandler
ApiHandler = {
    id: '',
    proxyUrl: '/test/proxy.php',
    $newsSection: null,
    $newsList: null,
    $newsItem: null,
    items: [],
    $searchButton: null,
    $noResult: null,
    $input: null,
    feed: '',
    $errorMsg: null,
    init: function(Id) {
        this.id = Id;

        //get DOM template elements
        var _newsList = document.getElementById(Id + '-list-template');
        var _newsItem = document.getElementById(Id + '-item-template');
        var _newsSection = document.querySelector('.' + Id + '-result-section');
        var _errorMsg = document.querySelector('.' + Id + '-error-msg');

        if (_newsList === null || _newsItem === null || _newsSection == null || _errorMsg === null) {
            console.log('Associated DOM elements not found!');
            return;
        }

        this.$newsList = $(_newsList);
        this.$newsItem = $(_newsItem);
        this.$newsSection = $(_newsSection);
        this.$errorMsg = $(_errorMsg);

        //remove ID's 
        this.$newsList.removeAttr('id');
        this.$newsItem.removeAttr('id'); 

        this.$newsSection.addClass('hide');

        //remove from DOM
        this.$newsItem.remove();

        //load more button
        var _searchButton = document.getElementById('search-button');
        var _input = document.getElementById('search-input');
        if (_searchButton !== null && _input !== null) {
            this.$searchButton = $(_searchButton);
            this.$input = $(_input);
            this.$searchButton.on('click', function(e) {
                //if already loading, stop
                if (this.$searchButton.hasClass('loading')) return false;

                this.$newsSection.addClass('hide');
                var _feed = this.$input.val();
                if (!_feed) {
                    this.$errorMsg.find('.scMessageBarText').text('The feed is empty!');
                    this.$errorMsg.removeClass('hide');
                    return false;
                }
                if(!this.validateUrl(_feed))
                {
                    this.$errorMsg.find('.scMessageBarText').text('The feed is not valid!');
                    this.$errorMsg.removeClass('hide');
                    return false;
                }

                this.$errorMsg.addClass('hide');

                this.feed = _feed;

                this.$searchButton.height(this.$searchButton.height());
                this.$searchButton.width(this.$searchButton.width());
                this.$searchButton.addClass('loading');

                //***********IMPORTANT!*********** remove timeout later, only for visual
                //setTimeout(function() {
                this.getNews(this.createNewsItems);
                //}.bind(this), 600);
                return false;
            }.bind(this));
        }

        //no result text
        var _noresult = document.querySelector('.no-result');
        if (_noresult !== null) {
            this.$noResult = $(_noresult);
        }
    },
    validateUrl: function(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    },
    loadNewsList: function() {
        //get news
        this.getNews(this.createNewsItems);
    },
    loadNewsLatestList: function() {
        //get news
        this.getNews(this.createNewsLatestItems);
    },
    clearNewsList: function() {
        if (ApiHandler.items.length) {
            $.each(ApiHandler.items, function(i, item) {
                item.parentNode.removeChild(item);
            });
        }
        ApiHandler.items = [];
    },
    createNewsItems: function(data) {
        ApiHandler.clearNewsList();

        if (!data.length) {
            ApiHandler.$searchButton.addClass('hide');
        }

        //loop thru result and create new <li> DOM elements
        var _language = Language.toLowerCase();
        $.each(data, function(i, item) {
            //console.log(item);
            var _clone = ApiHandler.$newsItem.clone()[0];

            //Title
            _clone.querySelector('.title > .text-link').innerHTML = item.title;
            //Link
            _clone.querySelector('.text-link').setAttribute('href', item.url);

            ApiHandler.items.push(_clone);
            ApiHandler.$newsList.append($(_clone));
        });

        ApiHandler.$newsSection.removeClass('hide');

        if (ApiHandler.$searchButton) {
            ApiHandler.$searchButton.height('');
            ApiHandler.$searchButton.width('');
            ApiHandler.$searchButton.removeClass('loading');
        }

        if (ApiHandler.$newsList.hasClass('loading')) ApiHandler.$newsList.removeClass('loading');

        if (ApiHandler.items.length) {
            if (!ApiHandler.$newsList.hasClass('show')) ApiHandler.$newsList.addClass('show');
            if (ApiHandler.$noResult.hasClass('show')) ApiHandler.$noResult.removeClass('show');
        } else {
            if (ApiHandler.$newsList.hasClass('show')) ApiHandler.$newsList.removeClass('show');
            if (!ApiHandler.$noResult.hasClass('show')) ApiHandler.$noResult.addClass('show');
        }
    },
    getNews: function(handleData) {
        $.getJSON({
            type: 'GET',
            dataType: 'json',
            url: this.proxyUrl,
            data: {
                feed: this.feed
            },
            success: function(data) {
                console.log(data);
                handleData(data.items);
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    }

};
//#endregion

(function() {

    if (typeof useApi !== 'undefined' && useApi) {
        //require('../lib/jquery.xdomainajax.js');
        ApiHandler.init('search');
    }
})();
