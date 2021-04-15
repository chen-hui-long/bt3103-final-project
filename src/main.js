import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routescomp from './routes.js'
import firebase from '@firebase/app';
require('firebase/auth');

//pop up
import VueSweetAlert from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
//import VueBreadcrumbs from 'vue-2-breadcrumbs';

//fontawesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
//import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VuePaginate from 'vue-paginate'
Vue.use(VuePaginate)

Vue.use(VueSweetAlert);

library.add(faAngleDown, faAngleUp)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)
//Vue.use(VueBreadcrumbs);
Vue.config.productionTip = false

const myRouter =  new VueRouter({
  routes:Routescomp,
  mode:'history'
})

let app;
firebase.auth().onAuthStateChanged(user => {
  console.log(user)
  if (!app) {
    app = new Vue({
      render: h => h(App),
      router:myRouter
    }).$mount('#app')
  }
})

