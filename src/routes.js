import Home from "./components/Home.vue";
import Product from "./components/Products.vue";
import Login from "./components/Login.vue";
import ForgotPw from "./components/ForgotPw.vue"
import Signup from "./components/Signup.vue";
import Sell from "./components/Sell.vue";
import Profile from "./components/Profile.vue";
import EditProfile from "./components/EditProfile.vue";
import SellForm from "./components/SellForm.vue";
import MultipleSelect from "./components/MultiSelect.vue";
import SellerSignup from "./components/SellerSignup.vue";
import SellerProfile from "./components/SellerProfile.vue";
import EditListing from "./components/Edit.vue";
import Faq from "./components/Faq.vue";
import TC from "./components/TC.vue"
import Dashboard from "./components/SellerDashboard.vue"
import firebase from "@firebase/app";
import db from "./firebase.js";
require("firebase/auth");
//import Favourite from './components/Favourite.vue'
export default [
  { path: "/", component: Home },
  { path: "/product", component: Product },
  { path: "/login", component: Login },
  { path: "/forgot", component: ForgotPw},
  { path: "/signup", component: Signup },
  { path: "/sell", component: Sell },
  { path: "/profile", component: Profile },
  { path: "/edit", component: EditProfile },
  { path: "/sellform", component: SellForm, beforeEnter: guardSellingForm},
  { path: "/multipleselect", component: MultipleSelect },
  { path: "/sellersignup", component: SellerSignup },
  { path: "/editlisting", component: EditListing, beforeEnter: guardEditListing},
  { path: "/sellerprofile", component: SellerProfile, beforeEnter : guardMyroute},
  { path: "/faq", component: Faq }, 
  { path: "/terms-and-conditions", component: TC },
  { path: "/dashboard", component: Dashboard },
  //{ path: '/Fav', component: Favourite}
];

function guardMyroute(to, from, next) {
  if (!firebase.auth().currentUser) {
    next({
      path: "/login"
    })
  } else {
    next();
  }
}

function guardEditListing(to, from, next) {
  if (!firebase.auth().currentUser) {
    next({
      path: "/login"
    })
  } else {
    db.collection("Users").doc(firebase.auth().currentUser.uid).get().then((doc) =>{
      console.log(doc.data().seller)
      if (!doc.data().seller) {
        next({
          path: '/sell'
        })
      }
    })
    next();
  }
}

function guardSellingForm(to, from, next) {
  if (!firebase.auth().currentUser) {
    next({
      path: "/login"
    })
  } else {
    db.collection("Users").doc(firebase.auth().currentUser.uid).get().then((doc) =>{
      console.log(doc.data().seller)
      if (doc.data().seller) {
        next({
          path: '/sellerprofile'
        })
      }
    })
    next();
  }
}


//For breadcrumb reference
/*{
    path: '/', 
    component: Page,
    meta: {
      breadcrumb: 'Home Page',
    },
    children: [
      {
        path: '/foo', 
        component: Foo,
        meta: {
          breadcrumb: 'Foo Page'  
        }
      },
      {
        path: '/bar', 
        component: Bar,
        meta: {
          breadcrumb: 'Bar Page'
        }
      }*/
