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
  {title: 'NatureGeoScienceCurrent', url: 'https://www.nature.com/ngeo/journal/vaop/ncurrent/rss.rdf'},
  {title: 'NatureGeoScience', url: 'http://www.nature.com/ngeo/current_issue/rss/index.html'}
]

const FUTURISM = {title: 'Futurism', url: 'https://futurism.com/feed/'}

let news = FEEDS.reduce((g, f) => {
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

store.registerModule('Futurism', {
  mutations: Futurism.mutations,
  state: Futurism.state
})

export default store
