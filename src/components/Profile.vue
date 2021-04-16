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
      <div v-show="this.showShops">
        <paginate name="favs" :list="favs" class="paginate-list" :per="6">
          <ul class="favs">
            <li class="shop" v-for="shopID in paginated('favs')" v-bind:key="shopID">
              <Favourite
                v-bind:shopID="shopID"
                v-on:unfavShop="unfavShop"
                v-on:favShop="favShop"
              />
            </li>
          </ul>
        </paginate>
        <div id="page-number" v-if= "revs.favs > 0">
          <paginate-links
            for="favs"
            :show-step-links="true"
          ></paginate-links>
        </div>
      </div>

      <div v-show="this.showReviews">
        <paginate name="reviews" :list="revs" class="paginate-list" :per="3">
          <ul class="revs">
            <li
              class="rev"
              v-for="review in paginated('reviews')"
              v-bind:key="review.UID"
            >
              <Review
                v-bind:rev="review"
                :checkFav="checkFav(review.UID)"
                v-on:favShop="favShop"
                v-on:unfavShop="unfavShop"
              />
            </li>
          </ul>
        </paginate>
        <div id="page-number" v-if= "revs.length > 0">
          <paginate-links
            for="reviews"
            :show-step-links="true"
          ></paginate-links>
        </div>
      </div>

      <div class="empty" v-if="this.showShops && this.total_fav == 0">
        <div class="firstLine">
          Nothing here... yet <br />
          You don't have any favourite shops yet! Explore Eatsy and find a shop
          you'll love.
        </div>
      </div>

      <div class="empty" v-if="this.showReviews && this.total_rev == 0">
        <br />
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
      paginate: ["reviews", "favs"],

      seller: [], //needed?
    };
  },

  props: {
    isFav: {
      type: Boolean,
    },
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

    checkFav(shop) {
      if (this.favs.includes(shop)) {
        return true;
      } else {
        return false;
      }
    },

    unfavShop(shop) {
      db.collection("bakeriesNew")
        .doc(shop)
        .update({
          favourite_users: firebase.firestore.FieldValue.arrayRemove(
            this.userID
          ),
          total_favourites_by_users: firebase.firestore.FieldValue.increment(
            -1
          ),
        });
      db.collection("Users")
        .doc(this.userID)
        .update({
          favourite: firebase.firestore.FieldValue.arrayRemove(shop),
          total_favourite: firebase.firestore.FieldValue.increment(-1),
        })
        .then(() => {
          location.reload();
        });
    },

    favShop(shop) {
      console.log("testing");
      db.collection("bakeriesNew")
        .doc(shop)
        .update({
          favourite_users: firebase.firestore.FieldValue.arrayUnion(
            this.userID
          ),
          total_favourites_by_users: firebase.firestore.FieldValue.increment(1),
        });
      db.collection("Users")
        .doc(this.userID)
        .update({
          favourite: firebase.firestore.FieldValue.arrayUnion(shop),
          total_favourite: firebase.firestore.FieldValue.increment(1),
        })
        .then(() => {
          location.reload();
        });
    },
  },

  created() {
    this.checkLogin();
    if (this.signedIn) {
      this.fetchItems();
      console.log(this.isFav);
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
  background-color: rgba(202, 206, 205, 0.753);
  border-radius: 8px;
  border: none;
  margin-top: 10px;
  margin-bottom: 10px;
}
.edit:hover {
  background-color: #e3dddf;
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
  border-radius: 20px;
  border: 0;
  outline: 0;
  font-family: system-ui;
}
.fav-review-button:hover,
.fav-review-button:focus,
.fav-review-button:active {
  border: black solid 2px;
}
.head-text {
  font-weight: bold;
  text-align: center;
}
.sub-text {
  text-align: center;
  /*margin-bottom: 33px;*/
  margin-bottom: 2.2em;
}

/*details*/
.container {
  display: flex;
}

.empty {
  padding-top: 20px;
  text-align: center;
}

button {
  cursor: pointer;
}

.favs {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

.revs {
  list-style-type: none;
  padding: 0;
  margin: auto;
  width: 50%;
}

#page-number > ul {
  display: flex;
  list-style-type: none;
  justify-content: center;
}
</style>