import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import feedStore from './feed'

Vue.use(Vuex)

const FEEDS = [
  // #0
  {title: 'NatureCurrent', url: 'http://feeds.nature.com/srep/rss/current'},
  // #1
  {title: 'NatureNewsComment', url: 'http://feeds.nature.com/NatureNewsComment?format=xml'},
  // #2
  {title: 'NatureNanoTech', url: 'http://feeds.nature.com/nnano/rss/current?format=xml'},
  // #3
  {title: 'NatureBioTech', url: 'http://feeds.nature.com/nbt/rss/current?format=xml'},
  // #4
  {title: 'NatureAOP', url: 'http://feeds.nature.com/nature/rss/aop?format=xml'},
  // #5
  {title: 'USResearch', url: 'http://feeds.feedburner.com/pnas/UJrK?format=xml'},
  // #6
  {title: 'Science', url: 'http://science.sciencemag.org/rss/express.xml'},
  // #7
  {title: 'ScienceRobotics', url: 'http://robotics.sciencemag.org/rss/current.xml'},
  // #8
  {title: 'NatureGeoScience', url: 'https://www.nature.com/ngeo/journal/vaop/ncurrent/rss.rdf'},
  // #9
  {title: 'NatureGeoScienceCurrent', url: 'http://www.nature.com/ngeo/current_issue/rss/index.html'},
  // #10
  {title: 'ScienceAdvanced', url: 'http://advances.sciencemag.org/rss/current.xml'},
  // #11
  {title: 'Futurism', url: 'https://futurism.com/feed/'},
  // #12
  {title: 'SomeNews', url: 'https://www.sciencenews.org/feeds/headlines.rss'},
  // #13
  {title: 'MostRecent'}
]

let news = FEEDS.reduce((g, f) => {
  g[f.title] = feedStore(f.title)
  return g
}, {})

function setFeedA (i, commit) {
  return api.getFeeds(FEEDS[i].url).then(res => commit(news[FEEDS[i].title].types.SET, res.item))
}

function setFeedB (i, commit) {
  return api.getFeeds(FEEDS[i].url).then(res => commit(news[FEEDS[i].title].types.SET, res.channel.item))
}

const actions = {
  /*eslint-disable*/
  ga () {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-101234444-1', 'auto');
    ga('send', 'pageview');
  },
  /*eslint-enble*/
  /**
   * Request feeds and set the store
   * @return {Promise}
   */
  setFeeds ({ commit }) {
    return setFeedA(1, commit).then(() => {
      return setFeedA(2, commit).then(() => {
        return setFeedA(3, commit).then(() => {
          return setFeedA(4, commit).then(() => {
            return setFeedB(12, commit)
          })
        })
      })
    })
  },

  setFeeds2 ({ commit }) {
    return setFeedA(5, commit).then(() => {
      return setFeedA(6, commit).then(() => {
        return setFeedA(7, commit).then(() => {
          return setFeedA(8, commit).then(() => {
            return setFeedA(9, commit)
          })
        })
      })
    })
  },

  setFuturism ({ commit }) {
    return setFeedB(11, commit)
  },

  setPage2 ({ commit }) {
    return setFeedA(10, commit)
  },

  setMostRecent ({ commit, state }) {
    const myDate = new Date()
    const DAY = myDate.getDay()
    let past = 1
    if (DAY === 0) {
      past = 3
    } else if (DAY === 6) {
      past = 2
    }

    let today = ((myDate.getTime()) - (3600 * 24 * past * 1000))

    let current = FEEDS.reduce((ac, feed) => {
      if (feed.title === 'MostRecent') {
        return ac
      }

      let found = state[feed.title].array.filter(i => {
        return new Date(i.publicationDate).getTime() >= today
      })

      return ac.concat(found)
    }, [])

    commit(news.MostRecent.types.SET, current)
  }
}

const getters = FEEDS.reduce((g, f) => {
  g[f.title] = (state) => {
    return state[f.title].array
  }

  return g
}, {})

// Create the store
var store = new Vuex.Store({
  getters: getters,
  actions: actions
})

FEEDS.map(f => {
  store.registerModule(f.title, {
    mutations: news[f.title].mutations,
    state: news[f.title].state
  })
})

export default store
