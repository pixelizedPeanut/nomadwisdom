import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import feedStore from './feed'

Vue.use(Vuex)

const FEEDS = [
  {title: 'NatureNewsComment', url: 'http://feeds.nature.com/NatureNewsComment?format=xml'},
  {title: 'NatureNanoTech', url: 'http://feeds.nature.com/nnano/rss/current?format=xml'},
  {title: 'NatureBioTech', url: 'http://feeds.nature.com/nbt/rss/current?format=xml'},
  {title: 'NatureAOP', url: 'http://feeds.nature.com/nature/rss/aop?format=xml'},
  {title: 'USResearch', url: 'http://feeds.feedburner.com/pnas/UJrK?format=xml'}
]

let news = FEEDS.reduce((g, f) => {
  g[f.title] = feedStore(f.title)
  return g
}, {})

const actions = {
  /**
   * Request feeds and set the store
   * @return {Promise}
   */
  setFeeds ({ commit }) {
    FEEDS.map((feed, i) => {
      return api.getFeeds(feed.url).then(res => commit(news[feed.title].types.SET, res.item))
    })
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
