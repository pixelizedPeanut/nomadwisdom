<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body { margin: 0; padding: 0; border: 0; outline: 0; }
body { line-height: 1.2em; }

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  color:#cccbcd;
  letter-spacing: 0.8px;
  background: #42415b;
  padding-top: 2em;
}

a {
  text-decoration: none;
  color:#cccbcd;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Josefin Sans',
  sans-serif; color:#cccbcd;
}

h1 {
  color:#d9d8d2;
  font-size:30px;
  font-weight: 100;
  line-height: 50px;
}

h4 {
  font-size: 16px;
  font-weight: 300;
}

h5 {
  font-size: 13px;
  line-height: 15px;
  font-weight: 400;
}

.wrap {
  display:block;
  width:95%;
  max-width: 1200px;
  margin:0 auto;
  column-count: 3;
  column-gap: 0px;
  padding-bottom: 50px;
}

@media (max-width: 768px ) {
  .wrap { column-count: 2;}
}

@media ( max-width:450px ) {
  .wrap { column-count: 1;}
}
</style>
