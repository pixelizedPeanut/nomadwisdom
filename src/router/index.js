import Vue from 'vue'
import Router from 'vue-router'
import Nomad from '@/components/Nomad'
import News from '@/components/News'
import Page2 from '@/components/Page2'

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
    },
    {
      path: '/page2',
      name: 'Page2',
      component: Page2
    }
  ]
})
