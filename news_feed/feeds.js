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
				{title: 'Nature', url: 'http://feeds.nature.com/NatureNewsComment?format=xml'},
				{title: 'Science', url: 'http://www.sciencemag.org/rss/current.xml'},
				{title: 'US Research', url: 'http://feeds.feedburner.com/pnas/UJrK?format=xml'},
			];
			if (feeds.length === 0) {
				for (var i=0; i<feedSources.length; i++) {
					FeedLoader.fetch({q: feedSources[i].url, num: 30}, {}, function (data) {
						var feed = data.responseData.feed;
						feeds.push(feed);
                        for (var i=0; i<feed.entries.length; i++) {
                            var entrie = feed.entries[i];
                            entrie.source = feed.title;
                            entrie.content = strip_tags(entrie.content, "");
                            entrie.title = entrie.title.replace(/\[[\s\S]+\]/,'');
                            entrie.publishedDate = new Date(entrie.publishedDate).getTime();
                            article.push(entrie);
                         console.log(entrie);
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