<template>
  <div class="profile">
    <div class="navbar">
      <NavBar></NavBar>
    </div>
    <div class="top-profile">
      <img class="profile-pic" v-bind:src="this.image" />
      <div class="profile-info">
        <a class="profile-name">{{ this.name }}</a>
        <br />
        <br />
        <button class="edit" v-on:click="edit()">Edit Profile</button>
      </div>
    </div>
    <div class="fav-review">
      <div class="fav-review-sub">
        <button class="fav-review-button" v-on:click="showShop()">♡</button>
        <div class="head-text">Favourite shops</div>
        <div class="sub-text">{{ this.total_fav }} shops</div>
      </div>

      <div class="fav-review-sub">
        <button class="fav-review-button" v-on:click="showReview()">☆</button>
        <div class="head-text">Past reviews</div>
        <div class="sub-text">{{ this.total_rev }} review</div>
      </div>
    </div>

    <div id="details">
      <div class="not-empty">
        <div id="shops" v-show="this.showShops">
          <div v-for="shopID in favs" v-bind:key="shopID">
            <Favourite v-bind:shopID="shopID" />
          </div>
        </div>

        <div id="reviews" v-show="this.showReviews">
          <div v-for="review in revs" v-bind:key="review.UID">
            <Review v-bind:rev="review" />
          </div>
        </div>
      </div>

      <div id="nothing1" v-if="this.showShops && this.total_fav == 0">
        <div class="firstLine">Nothing here... yet</div>
        <div class="secondLine">
          You don't have any favourite shops yet! Explore Eatsy and find a shop
          you'll love.
        </div>
      </div>

      <div id="nothing2" v-if="this.showReviews && this.total_rev == 0">
        <div class="firstLine">Nothing here... yet</div>
        <div class="secondLine">
          You haven't given any reviews yet! Start purchasing and leave your
          reviews.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Favourite from "./Favourite.vue";
import Review from "./Review.vue";
import db from "../firebase.js";
import firebase from "@firebase/app";
require("firebase/auth");
import NavBar from "./ProfileNavBar";

export default {
  data() {
    return {
      signedIn: false,
      userID: null,
      image: "",
      favs: [],
      revs: [],
      showShops: false,
      showReviews: false,
      name: "",
      total_fav: 0,
      total_rev: 0,

      seller: [], //needed?
    };
  },

  components: {
    NavBar,
    Favourite,
    Review,
  },

  methods: {
    checkLogin: function () {
      if (firebase.auth().currentUser) {
        this.signedIn = true;
        this.userID = firebase.auth().currentUser.uid;
      }
    },

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
          this.seller.push(snapshot.data().seller); //needed?
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
      this.$router.push({ path: "edit", params: { userID: this.userID } });
    },
  },

  created() {
    this.checkLogin();
    if (this.signedIn) {
      this.fetchItems();
    } else {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style scoped>
.navbar {
  text-align: center;
}

/*user*/
.top-profile {
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-pic {
  border-radius: 50%;
  width: 150px;
  height: 150px;
}
.profile-info {
  margin-left: 30px;
}
.profile-name {
  font-size: 30px;
  margin-right: 5px;
  font-weight: bolder;
}
.edit {
  background-color: #919191;
  color: black;
  border-radius: 30px;
}

/*button*/
.fav-review {
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fav-review-sub {
  margin-left: 10px;
  margin-right: 10px;
}
.fav-review-button {
  width: 125px;
  height: 75px;
  font-size: 30px;
  border-radius: 30px;
  border: 0;
}
.fav-review-button:hover,
.fav-review-button:focus,
.fav-review-button:active {
  border: black solid 1px;
}
.head-text {
  font-weight: bold;
  text-align: center;
}
.sub-text {
  text-align: center;
}

/*details*/
.not-empty {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
}
#shops {
  width: 350px;
}
#reviews {
  flex: 50%;
}
</style>