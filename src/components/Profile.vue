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
    
        <div id="history">
            <div id="shopButton">
                <button v-on:click="showShop()"/>
                <div>Favourite shops</div>
                <div>{{this.total_fav}} shops</div>
            </div>

            <div id="reviewButton">
                <button v-on:click="showReview()"/>
                <div>Past reviews</div>
                <div>{{this.total_rev}} review</div>
            </div>
        </div>


        <div id="details">
          
            <div id="shops" v-show="this.showShops">
                <div v-for="shopID in favs" v-bind:key="shopID">
                    <Favourite v-bind:shopID="shopID"/>
                </div>
            </div>

            <div id="reviews" v-show="this.showReviews">
                <div v-for="review in revs" v-bind:key="review.UID">
                    <Review v-bind:rev="review"/>
                </div>
            </div>
 
            <div id="nothing1" v-if="this.showShops && this.total_fav == 0">
                <div class="firstLine">Nothing here... yet</div>
                <div class="secondLine">You don't have any favourite shops yet! Explore Eatsy and find a shop you'll love.</div>
            </div>

            <div id="nothing2" v-if="this.showReviews && this.total_rev == 0">
                <div class="firstLine">Nothing here... yet</div>
                <div class="secondLine">You haven't given any reviews yet! Start purchasing and leave your reviews.</div>
            </div>  
        </div>
    
  </div>
</template>

<script>
import Favourite from './Favourite.vue'
import Review from './Review.vue'
import db from "../firebase.js";
import firebase from "@firebase/app";
require("firebase/auth");
import NavBar from "./ProfileNavBar";

export default {
  data() {
    return {
      userID: firebase.auth().currentUser.uid,
      image: "",
      favs: [],
      revs: [],
      showShops: true,
      showReviews: false,
      name: "",
      total_fav: 0,
      total_rev: 0,


      seller:[], //needed?
    };
  },

  components: {
    NavBar,
    Favourite,
    Review,
  },

  methods: {
    fetchItems() {
      db.collection("Users")
        .doc(this.userID)
        .get()
        .then((snapshot) => {
          this.image = snapshot.data().image;
          this.favs = snapshot.data().favourite;
          this.revs = snapshot.data().reviews;
          this.name = snapshot.data().name;
          this.total_fav = snapshot.data().total_favourite;
          this.total_rev = snapshot.data().total_review;

         
          this.seller.push(snapshot.data().seller) //needed?
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

/*
    getLength(ary){
      if (ary && ary.length){
        return ary.length;
      } else {
        return 0;
      }
    },
    */

    edit() {
      this.$router.push({ name: "edit", params: { userID: this.userID } });
    },
  },

  created() {
    this.userID = firebase.auth().currentUser.uid;
    /*
    db.collection("Users").doc(this.userID).get().then(snapshot => {
      console.log(snapshot.data().reviews)
    })
    */
    this.fetchItems();
  },
};
</script>

<style scoped> 
.links {
    text-align: left;
    padding-left: 10%;
    padding-bottom: 20px;
}

#profile {
    color: black;
}

/*user*/
#user {
    size: 50%;
    padding-left: 10%;
    padding-bottom: 40px;
}

#img {
    float: left;
    width: 90px;
    border-radius: 90px;
}

#username {
    size: 30px;
    float: left;
    font-weight: bolder;
    padding-left: 5%;
    padding-right: 5%
}

#edit {
    float: left;
    height: 10%;
    background-color: white;
    color: black;
    border-radius: 30px;
    padding-left:10px;
    padding-right:10px;
}

#user:after {
    content: "";
    display: table;
    clear: both;
}

/*history*/
#history{
    padding-left: 10%;
    width: 30%;

}

.show {
    width: 120px;
    height: 80px;
    border-radius: 25px;
}

.title {
    font-weight: bold;

}

/*shops*/
#shopButton {
    float: left;
    padding-right: 50px;
}


/*reviews*/
#reviewButton {
    float: left;
}

#history:after{
    content: "";
    display: table;
    clear: both;
}
</style>