<template>
<div class="news">
  <!-- <div id="clock"></div> -->
  <h4 class="title">Most Recent</h4>
  <div class="wrap">
    <a class="element" v-for="a in $store.getters.mostRecent" :href="a.link" target="_blank">
      <p>{{ a.title | blank }}</p>
      <p v-html="a.description"></p>
      <span>{{ a.publicationName }}</span>
      <span>{{ a.publisher }}</span>
      <span>{{ a.publicationDate }}</span>
    </a>
  </div>
  <div v-for="feed in feeds" v-if="feed !== feeds[0]">
    <h4 class="title">{{ feed }}</h4>
    <div class="wrap">
      <a class="element" v-for="a in $store.getters[feed]" :href="a.link" target="_blank">
        <p>{{ a.title | blank }}</p>
        <p>{{ a.description | blank }}</p>
        <span>{{ a | getDate }}</span>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import clock from '../utils/polar-clock'

const FEEDS = [
  'mostRecent',
  'Futurism',
  'NatureGeoScience',
  'NatureGeoScienceCurrent',
  'ScienceRobotics',
  'NatureCurrent',
  'NatureAOP',
  'NatureNewsComment',
  'NatureNanoTech',
  'Science',
  'NatureBioTech',
  'USResearch',
  'SomeNews'
]

export default {
  name: 'news',
  created () {
    this.ga()
    this.setFeeds()
    this.setPage2()
    this.setSome()
    this.setFuturism().then(() => {
      this.setMostRecent()
    })
  },
  // mounted () {
  //   clock()
  // },
  data () {
    return {
      feeds: FEEDS
    }
  },
  filters: {
    blank: v => typeof v === 'object' ? null : v,
    getDate: v => v.publishedDate || v.pubDate
  },
  computed: {
    ...mapGetters(FEEDS)
  },
  methods: {
    ...mapActions([
      'ga',
      'setFeeds',
      'setFuturism',
      'setMostRecent',
      'setPage2',
      'setSome'
    ])
  }
}
</script>
<style scoped>
#clock {
  font-size: 8px;
}

a.element {
  display:block;
  padding:15px;
}

a.element:hover {
  background: #32314b;
}

.title {
  text-align: center;
  font-size: 2em;
}

.wrap {
  column-gap: 0px;
}
</style>
