<template>
<div class="news">
  <div v-for="feed in getStream" v-if="feed" :title="feed.channel.description">
    <h4 class="title">{{ feed.channel.title }}</h4>
    <div class="wrap">
      <h1>h</h1>
      <a class="element" v-for="a in feed.item" v-if="a" :href="a.link" target="_blank">
        <p>{{ a.title | blank }}</p>
        <p>{{ a.description | blank }}</p>
      </a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      stream: [],
      base: 'http://nomadwisdom.tk/utilities/curlProxy.php?url=',
      feeds: [
        {title: 'NatureNewsComment', url: 'http://feeds.nature.com/NatureNewsComment?format=xml'},
        {title: 'NatureNanoTech', url: 'http://feeds.nature.com/nnano/rss/current?format=xml'},
        {title: 'NatureBioTech', url: 'http://feeds.nature.com/nbt/rss/current?format=xml'},
        {title: 'NatureAOP', url: 'http://feeds.nature.com/nature/rss/aop?format=xml'},
        {title: 'US Research', url: 'http://feeds.feedburner.com/pnas/UJrK?format=xml'}
      ]
    }
  },
  filters: {
    blank: v => typeof v === 'object' ? null : v
  },
  computed: {
    getStream () {
      return this.stream
    }
  },
  methods: {
    getFeeds () {
      this.feeds.map((feed, i) => {
        window.fetch(this.base + encodeURIComponent(this.feeds[i].url), {
          method: 'GET'
        }).then(res => res.json()).then(res => {
          this.stream[i] = res
        })
      })
    }
  },
  mounted () {
    this.getFeeds()
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

@media (max-width: 768px ) {
  .wrap { column-count: 2;}
}

@media ( max-width:450px ) {
  .wrap { column-count: 1;}
}
</style>
