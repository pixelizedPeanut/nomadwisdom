var feeds = [];
var article = [];
for(var l = 0; l < 8; l++) {
    article.push([]);
};
var entries = article[7];


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
                {title: 'NatureAOP', url: 'http://feeds.nature.com/nature/rss/aop?format=xml'},
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

                            entries.push(entrie);// push them all like this
                            console.log(entrie);

                        };
					});
                    //if i e max si k e max
                    // apoi recontruite pe: min&min+1, min+2, etc
                    for (var p=0; p<entries.length; p++) {

                        if (entries[p].recent == min) {
                            article[0].push(entries[p]);
                        }
                        else if (entries[p].recent < 7) { 
                            article[entries[p].recent].push(entries[p]);       
                        }       
                    };
				};
                 // than for again prin toate pentru a determina min entrie.recent
                
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

function myMin(min) {
    var min = 5;
    for (var m=0; m<entries.length; m++) {
        min = entries[m].recent < min ? entries[m].recent : min;
        console.log(min);
        return min;
    } 
}

function gheorghe(nume) { return ('Gheorghe ' + nume) }
var gigi = gheorghe('Gigel');
console.log(gigi);




//daca article de 0 empty what
//check entrue recent si make article 0 din min&min+1