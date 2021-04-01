<template>
  <div class="profile">
    <div class="links">
      <router-link id="home" to="/home">Home / </router-link>
      <router-link id="profile" to="/profile">Profile</router-link>
    </div>
    <NavBar></NavBar>
    <div id="user">
      <img v-bind:src="this.image" />
      <div id="username">{{ this.name }}</div>
      <button id="edit" v-on:click="edit()">Edit Profile</button>
    </div>
    <!--
        <div id="history">
            <div id="shopButton">
                <button v-on:click="showShop()"/>
                <div>Favourite shops</div>
                <div>{{this.shops.length}} shops</div>
            </div>

            <div id="reviewButton">
                <button v-on:click="showReview()"/>
                <div>Past reviews</div>
                <div>{{this.reviews.length}} review</div>
            </div>
        </div>


        <div id="details">
            <div id="shops" v-show="this.showShops">
                <div v-for="shopName in shops" v-bind:key="shopName">
                    <Favourite v-bind:shopName="shopName"/>
                </div>
            </div>

            <div id="reviews" v-show="this.showReviews">
                <div v-for="review in reviews" v-bind:key="review.id">
                    <Review v-bind:review="review"/>
                </div>
            </div>

            <div id="nothing1" v-if="this.showShops & this.shops.length == 0">
                <div class="firstLine">Nothing here... yet</div>
                <div class="secondLine">You don't have any favourite shops yet! Explore Eatsy and find a shop you'll love.</div>
            </div>

            <div id="nothing2" v-if="this.showReviews & this.reviews.length == 0">
                <div class="firstLine">Nothing here... yet</div>
                <div class="secondLine">You haven't given any reviews yet! Start purchasing and leave your reviews.</div>
            </div>
        </div>
        -->
  </div>
</template>

<script>
//import Favourite from './Favourite.vue'
//import Review from './Review.vue'
import db from "../firebase.js";
import firebase from "@firebase/app";
require("firebase/auth");
import NavBar from "./ProfileNavBar";

export default {
  data() {
    return {
      userID: firebase.auth().currentUser.uid,
      image: "",
      seller: [],
    };
  },

  components: {
    NavBar,
    //Favourite,
    //Review,
  },

  methods: {
    fetchItems() {
      db.collection("Users")
        .doc(this.userID)
        .get()
        .then((snapshot) => {
          this.image = snapshot.data().image;
          this.seller.push(snapshot.data().seller);
          // need to check whether formats are correct
        });
    },

    showShop() {
      this.showShops = true;
      this.showReviews = false;
    },

    showReview() {
      this.showReviews = true;
      this.showShops = false;
    },

    edit() {
      this.$router.push({ name: "edit", params: { userID: this.userID } });
    },
  },

  created() {
    this.fetchItems();
    console.log(this.image);
    console.log(this.seller[0])
  },
};
</script>

<style scoped>
</style>