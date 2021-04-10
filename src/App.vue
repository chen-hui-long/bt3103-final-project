<template>
  <div id="app">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Raleway&display=swap" rel="stylesheet">

    <app-header :key ="componentKey"></app-header>
    <p>
    <router-link to="/signup" exact>Sign Up</router-link> |
    <router-link to="/login" exact>Login</router-link> |
    <router-link to="/product" exact>Product</router-link> |
    <router-link to="/profile" exact>User Profile</router-link> |
    <router-link to="/" exact>Home</router-link> |
    </p>
    ROUTE LINK THAT REQUIE LOGIN:
    DO NOT DELETE FIRST USE THIS AS DEBUG  
    <router-view></router-view>

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
  position: relative;
  min-height: 100vh;
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




</style>