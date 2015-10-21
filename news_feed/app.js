(function() {
  var app = angular.module('newsFeed', []);

    
    app.controller('natureController', ['$http', function($http){
        var items = this;
        items.news = [];
        $http.get('feed.php?url=http://feeds.nature.com/NatureNewsComment?format=xml').success(function(data){
           // console.log(data);
            items.news = data;
            for( var i = 0; i < items.news.item.length; i++ ){
                if(!items.news.item[i].description.length) items.news.item[i].description = 'Visit link';
            }
            // console.log(items.news);
        });
    }]);
    
    app.controller('scienceController', ['$http', function($http){
        var items = this;
        items.news = [];
        $http.get('feed.php?url=http://www.sciencemag.org/rss/current.xml').success(function(data){
           // console.log(data);
            items.news = data;
            for( var i = 0; i < items.news.item.length; i++ ){
                if(!items.news.item[i].description.length) items.news.item[i].description = 'Visit link';
            }
            // console.log(items.news);
        });
    }]);
    
    app.controller('usController', ['$http', function($http){
        var items = this;
        items.news = [];
        $http.get('feed.php?url=http://feeds.feedburner.com/pnas/UJrK?format=xml').success(function(data){
           // console.log(data);
            items.news = data;
            for( var i = 0; i < items.news.item.length; i++ ){
                //if(!items.news.item[i].description.length) items.news.item[i].description = 'Visit link';
                items.news.item[i].description = items.news.item[i].description.match(/([\S\s]+)<img[\S\s]+\/>/)[1];
            }
            // console.log(items.news);
        });
    }]);
    
})();

