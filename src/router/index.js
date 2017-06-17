import Vue from 'vue'
import Router from 'vue-router'
import Nomad from '@/components/Nomad'
import News from '@/components/News'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Nomad',
      component: Nomad
    },
    {
      path: '/news_feed',
      name: 'News Feed',
      component: News
    }
  ]
})
