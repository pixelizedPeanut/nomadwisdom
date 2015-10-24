var feeds = [];
var article = [];	

angular.module('feedModule', ['ngResource'])
	.factory('FeedLoader', function ($resource) {
		return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
			fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
		});
	})
	.service('FeedList', function ($rootScope, FeedLoader) {
		this.get = function() {
			var feedSources = [
				{title: 'NatureNewsComment', url: 'http://feeds.nature.com/NatureNewsComment?format=xml'},
                {title: 'NatureNanoTech', url: 'http://feeds.nature.com/nnano/rss/current?format=xml'},
                {title: 'NatureBioTech', url: 'http://feeds.nature.com/nbt/rss/current?format=xml'},
				{title: 'Science', url: 'http://www.sciencemag.org/rss/current.xml'},
				{title: 'US Research', url: 'http://feeds.feedburner.com/pnas/UJrK?format=xml'},
			];
			if (feeds.length === 0) {
                
				for (var i=0; i<feedSources.length; i++) {
					FeedLoader.fetch({q: feedSources[i].url, num: 15}, {}, function (data) {
						var feed = data.responseData.feed;
						feeds.push(feed);
                        for (var k=0; k<feed.entries.length; k++) {  
                            var entrie = feed.entries[k];
                            var now = new Date();
                            entrie.source = feed.title;
                            entrie.content = strip_tags(entrie.content, "");
                            entrie.title = entrie.title.replace(/\[[\s\S]+\]/,'');
                            entrie.publishedDate = new Date(entrie.publishedDate).getTime();
                            entrie.recent = Math.ceil((now - entrie.publishedDate)/86400000);
                            if (entrie.recent < 8) {article.push(entrie);
                            console.log(entrie);    }
                        };
					}); 
				}
			}
            
            return article;
		};
	})
	.controller('FeedCtrl', function ($scope, FeedList) {
		$scope.article = FeedList.get();
		$scope.$on('FeedList', function (event, data) {
			$scope.article = data;
            
		});
	});