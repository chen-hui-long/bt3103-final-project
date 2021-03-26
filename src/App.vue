<template>


  <div id="app">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Raleway&display=swap" rel="stylesheet">

    <app-header></app-header>
    <!--hello-world></hello-world-->
    <product-page></product-page>

    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'

import Footer from './components/Footer'
//import Products from './components/Products.vue'
import HelloWorld from './components/Content.vue'


export default {
  name: 'App',
  components: {
    'app-header':Header,
    'app-footer':Footer,
    'product-page': Products,
    /*HelloWorld*/
    
  }
}
</script>

<style>
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  position: relative;
  min-height: 100vh;
}


#app-footer{
  position:absolute;
   bottom:0;
}

html,
body {
  margin: 0 !important;
  padding: 0 !important;
}

</style>
