<template>
  <div id="app">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Raleway&display=swap" rel="stylesheet">

    <app-header :key ="componentKey"></app-header> 
    <div class="container">
    <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    'app-header':Header,
    'app-footer':Footer,

    
  }, 
  data () {
    return {
      componentKey: 0, 
    };
  }, 
  methods: {
    forceRerender() {
      this.componentKey += 1;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  position:relative;
  min-height: 100vh;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
}

app-footer{
  position:absolute;
  bottom:0;
}

html,
body {
  margin: 0 !important;
  padding: 0 !important;
}

app-header{
  position:absolute;
}

button {
  outline: 0;
}



</style>