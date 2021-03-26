import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routescomp from './routes.js'
//import VueBreadcrumbs from 'vue-2-breadcrumbs';

//fontawesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
//import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleDown, faAngleUp)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)
//Vue.use(VueBreadcrumbs);
Vue.config.productionTip = false

const myRouter =  new VueRouter({
  routes:Routescomp,
  mode:'history'
})

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')
