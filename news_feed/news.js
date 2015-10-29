(function(){
    angular.module('article-directives', [])
        .directive("latestNews", function() {
          return {
            restrict: 'E',
            templateUrl: "latest-news.html"
          };
        })
        .directive("olderArticles", function() {
          return {
            restrict: "E",
            templateUrl: "older-articles.html",
            controller: function() {
              this.tab = 1;

              this.isSet = function(checkTab) {
                return this.tab === checkTab;
              };

              this.setTab = function(activeTab) {
                this.tab = activeTab;
              };
            },
            controllerAs: "article"
          };
        });
  })();