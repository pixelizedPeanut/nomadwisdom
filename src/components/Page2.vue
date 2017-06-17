<template>
<div class="news">
  <div v-for="feed in feeds">
    <h4 class="title">{{ feed }}</h4>
    <div class="wrap">
      <a class="element" v-for="a in $store.getters[feed]" :href="a.link" target="_blank">
        <p>{{ a.title | blank }}</p>
        <p v-html="a.description"></p>
        <span>{{ a.publicationDate }}</span>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const FEEDS = [
  'ScienceAdvanced'
]

export default {
  name: 'page2',
  created () {
    this.setPage2()
    this.ga()
  },
  data () {
    return {
      feeds: FEEDS
    }
  },
  filters: {
    blank: v => typeof v === 'object' ? null : v
  },
  computed: {
    ...mapGetters(FEEDS)
  },
  methods: {
    ...mapActions([
      'setPage2',
      'ga'
    ])
  }
}
</script>
<style scoped>
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
