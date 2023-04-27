import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import feedStore from './feed'

Vue.use(Vuex)

const FEEDS = [
  {title: 'NatureCurrent', url: 'https://www.nature.com/srep.rss'},
//  {title: 'NatureNewsComment', url: 'http://feeds.nature.com/NatureNewsComment?format=xml'},
  {title: 'NatureNanoTech', url: 'https://www.nature.com/nnano.rss'},
  {title: 'NatureBioTech', url: 'https://www.nature.com/nbt.rss'},
//  {title: 'NatureAOP', url: 'http://feeds.nature.com/nature/rss/aop?format=xml'}, moved under nature
//  {title: 'USResearch', url: 'http://feeds.feedburner.com/pnas/UJrK?format=xml'},
//  {title: 'Science', url: 'https://feeds.science.org/rss/science-aop.xml'}, // works
//  {title: 'ScienceRobotics', url: 'https://feeds.science.org/rss/science-robotics.xml'}, // works
  {title: 'NatureGeoScienceCurrent', url: 'https://www.nature.com/ngeo.rss'}
//  {title: 'NatureGeoScience', url: 'https://www.nature.com/ngeo/current-issue'} // see location, needs cookie // works
]

const PAGE2 = [
  {title: 'ScienceAdvanced', url: 'https://feeds.science.org/rss/science-advances.xml'}
]

const FUTURISM = {title: 'Futurism', url: 'https://futurism.com/feed'}

let news = FEEDS.reduce((g, f) => {
  g[f.title] = feedStore(f.title)
  return g
}, {})

let news2 = PAGE2.reduce((g, f) => {
  g[f.title] = feedStore(f.title)
  return g
}, {})

let Futurism = feedStore(FUTURISM.title)

const actions = {
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

  setPage2 ({ commit }) {
    PAGE2.map((feed, i) => {
      return api.getFeeds(feed.url).then(res => commit(news2[feed.title].types.SET, res.item))
    })
  }
}

const getters = FEEDS.reduce((g, f) => {
  g[f.title] = (state) => {
    return state[f.title].array
  }

  return g
}, {
  Futurism: state => state.Futurism.array
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

export default store
