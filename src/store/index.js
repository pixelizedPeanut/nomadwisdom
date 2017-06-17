import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import feedStore from './feed'

Vue.use(Vuex)

const FEEDS = [
  {title: 'NatureCurrent', url: 'http://feeds.nature.com/srep/rss/current'},
  {title: 'NatureNewsComment', url: 'http://feeds.nature.com/NatureNewsComment?format=xml'},
  {title: 'NatureNanoTech', url: 'http://feeds.nature.com/nnano/rss/current?format=xml'},
  {title: 'NatureBioTech', url: 'http://feeds.nature.com/nbt/rss/current?format=xml'},
  {title: 'NatureAOP', url: 'http://feeds.nature.com/nature/rss/aop?format=xml'},
  {title: 'USResearch', url: 'http://feeds.feedburner.com/pnas/UJrK?format=xml'},
  {title: 'Science', url: 'http://science.sciencemag.org/rss/express.xml'},
  {title: 'ScienceRobotics', url: 'http://robotics.sciencemag.org/rss/current.xml'},
  {title: 'NatureGeoScience', url: 'https://www.nature.com/ngeo/journal/vaop/ncurrent/rss.rdf'},
  {title: 'NatureGeoScienceCurrent', url: 'http://www.nature.com/ngeo/current_issue/rss/index.html'}
]

const PAGE2 = [
  {title: 'ScienceAdvanced', url: 'http://advances.sciencemag.org/rss/current.xml'}
]

const FUTURISM = {title: 'Futurism', url: 'https://futurism.com/feed/'}
const SOME = {title: 'SomeNews', url: 'https://www.sciencenews.org/feeds/headlines.rss'}

let news = FEEDS.reduce((g, f) => {
  g[f.title] = feedStore(f.title)
  return g
}, {})

let news2 = PAGE2.reduce((g, f) => {
  g[f.title] = feedStore(f.title)
  return g
}, {})

let Futurism = feedStore(FUTURISM.title)
let SomeNews = feedStore(SOME.title)

let mostRecent = feedStore('mostRecent')

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
    FEEDS.map((feed, i) => {
      return api.getFeeds(feed.url).then(res => commit(news[feed.title].types.SET, res.item))
    })
  },

  setFuturism ({ commit }) {
    return api.getFeeds(FUTURISM.url).then(res => commit(Futurism.types.SET, res.channel.item))
  },

  setSome ({ commit }) {
    return api.getFeeds(SOME.url).then(res => commit(SomeNews.types.SET, res.channel.item))
  },

  setPage2 ({ commit }) {
    PAGE2.map((feed, i) => {
      return api.getFeeds(feed.url).then(res => commit(news2[feed.title].types.SET, res.item))
    })
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
      let found = state[feed.title].array.filter(i => {
        return new Date(i.publicationDate).getTime() >= today
      })

      return ac.concat(found)
    }, [])

    current = current.concat(PAGE2.reduce((ac, feed) => {
      let found = state[feed.title].array.filter(i => {
        return new Date(i.publicationDate).getTime() >= today
      })

      return ac.concat(found)
    }, []))

    commit(mostRecent.types.SET, current)
  }
}

const getters = FEEDS.reduce((g, f) => {
  g[f.title] = (state) => {
    return state[f.title].array
  }

  return g
}, {
  Futurism: state => state.Futurism.array,
  SomeNews: state => state.SomeNews.array,
  mostRecent: state => state.mostRecent.array
})

PAGE2.map(f => {
  getters[f.title] = state => state[f.title].array
})

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

PAGE2.map(f => {
  store.registerModule(f.title, {
    mutations: news2[f.title].mutations,
    state: news2[f.title].state
  })
})

store.registerModule('Futurism', {
  mutations: Futurism.mutations,
  state: Futurism.state
})

store.registerModule('SomeNews', {
  mutations: SomeNews.mutations,
  state: SomeNews.state
})

store.registerModule('mostRecent', {
  mutations: mostRecent.mutations,
  state: mostRecent.state
})

export default store
