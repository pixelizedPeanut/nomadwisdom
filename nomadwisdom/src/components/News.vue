<template>
<div class="news">
  <div v-for="feed in feeds">
    <h4 class="title">{{ feed }}</h4>
    <div class="wrap">
      <a class="element" v-for="a in $store.getters[feed]" :href="a.link" target="_blank">
        <p>{{ a.title | blank }}</p>
        <p>{{ a.description | blank }}</p>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'news',
  created () {
    this.setFeeds()
  },
  data () {
    return {
      feeds: [
        'NatureAOP',
        'NatureNewsComment',
        'NatureNanoTech',
        'NatureBioTech',
        'USResearch'
      ]
    }
  },
  filters: {
    blank: v => typeof v === 'object' ? null : v
  },
  computed: {
    ...mapGetters([
      'NatureAOP',
      'NatureNewsComment',
      'NatureNanoTech',
      'NatureBioTech',
      'USResearch'
    ])
  },
  methods: {
    ...mapActions([
      'setFeeds'
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
