<template>
<div>
  <h1 class="wrap"><i class="ico-spin6 animate-spin"></i>Nomad Wisdom</h1>
  <div class="main-content wrap">
    <div class="article-box col-2">
      <article class="col-4">
        <h3>Can’t we all just be friends?</h3>
        <p>Living by the principle “no shortcuts” I perceive my brand new job offer as both an achievement and a dangerous shortcut for my personality. With vaguely 3-4 years of uni in social sciences, followed strictly out of boredom due to incompetence of the system to come up with a good enough profile for my multidisciplinary natural sciences interest, how did I get to collaborate with a company that makes cutting edge technology for genome editing? </p>
        <p>To make me feel better I read about how the Chinese nepotism interfered in recognising Youyou To  scientific talent in their academy. Why it failed? Because she had no doctorate and no admission to a national academy. But this didn’t stop her from earning the first Nobel prize to be awarded to a researcher from China. I did have the feeling and I’ve also been told that in uni they study 10 years old science but I guess this is my process of growing up … rebuilding the world I once knew.</p>
        <img class="col-4 img" src="../assets/papa.jpg" />
        <p>I mentioned nepotism … one more mystery, until not more that than 15 minutes ago I would have said this is a made up Romanian word to describe how at home titles are given in family, we also have the word “nepot” that means nephew, and -ism is a common suffix to target a social behaviour. But yet in english it describes some category of political corruption. Wiki says it comes from the Italian “nepotismo”. If wiki says so, but in Italy it descries an old past and limited phenomenon while in Romanian they are widely used both nepot and nepotism and they also have a grammatically valid link of derivation. Its high presence in today’s language gives the word nepotism a greater chance to influence a germanic language like English and the similarity points in the same direction. But again, who has the power makes the rules, isn’t this one of the implications on nepotism?</p>
      </article>
    </div>

    <div class="article-box col-1">
      <article class="col-4">
        <img class="col-4 img" src="../assets/trifoi.jpg" />
        <h3>Weeds Weeds Horray</h3>
        <p>As we all love Darvin and try to make him proud, US crops were the ones that gave us all a lesson on how to do it best.</p>
        <p>Sangwon Suh and Yi Yang from the University of California, Santa Barbara, assessed the local environmental impacts of crops, including pollution from direct runoff of fertilizers and pesticides, as well as from processing and transportation. As I like reading between the lines I am more than delighted to share that pests and weeds are beginning to develop resistance to the pesticides produced by the modified crops</p>
        <p>With love from reading <a href="www.nature.com">nature.com</a>.</p>
        <p>_へ__(‾◡◝ )></p>
      </article>
    </div>

    <div class="article-box col-1">
      <article class="col-4">
        <h3>Cooking is lethal</h3>
        <p>According to a study published in Nature Magazine September 2015 air particles smaller than 2.5mc are responsible for an average of 3.3 million premature deaths in 2010.</p>
        <img class="col-4 img" src="../assets/pan-fire.jpg" />
        <p>The interesting fact is that particles of organic provenience bring a lot more casualties than crust material, nitrates or sulphates. But the reason I ended up writing this article is the following phrase: 3.54 million deaths per year caused by indoor air pollution. Did I read right? Yes it is INDOOR air pollution, and further on I discover that the outmost evil is cooking. Of course it is about India and China, but it is still difficult to overlook the fact that in China casualties caused by cooking are “approximately an order of magnitude higher than that attributable to Chinese road transport injuries and HIV/AIDS”. I think I made my point ;) be safe, go out!</p>
      </article>
    </div>

    <div class="article-box col-1">
      <article class="col-4">
        <h3>Two</h3>
        <p>To dry your clotes you need to cook them at a temperature of over 75°C, otherwise the water will not evaporate.</p>
      </article>

      <article class="col-2p5">
        <h3>One</h3>
        <p>One is just one-derfull.</p>
      </article>

      <article class="col-2">
        <h3>Feed me!</h3>
        <p class="action" @click="read('/news_feed')">Read the news!</p>
        <p class="action" @click="read('/page2')">Read Page2</p>
      </article>
    </div>
  </div>
  <footer></footer>
</div>
</template>
<script>
export default {
  name: 'nomad',
  data () {
    return {
      article: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    read (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
}

.action {
  cursor: pointer;
  letter-spacing: 5px;
}

.action:hover {
  padding-left: 5px;
  letter-spacing: 10px;
}


</style>
