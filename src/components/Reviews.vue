<template>
  <div class="review-wrapper">
    <div><h3>Review this shop</h3></div>
    <form>
      <input type="text" placeholder="Leave a review here" v-model="review" />

      <div class="ratings">
        <span><h3>Ratings:</h3></span>
        <span class="stars"
          ><star-rating
            v-bind:show-rating="false"
            v-bind:star-size="20"
            @rating-selected="setRating"
            border-color="black"
            border-width="3"
            rounded-corners="true"
            inactive-color="white"
            active-color="black"
          ></star-rating
        ></span>
        <button type="submit" v-on:click.prevent="submit">Submit</button>
      </div>
    </form>

    <div class="reviews">
      <span
        ><h3>{{ this.total_reviews }} Reviews</h3></span
      >
      <!-- to  retrieve star ratings from database-->
      <span class="stars"
        ><star-rating
          read-only="true"
          increment="0.1"
          v-model="this.rating"
          v-bind:show-rating="false"
          v-bind:star-size="16"
          border-color="black"
          border-width="3"
          rounded-corners="true"
          inactive-color="white"
          active-color="black"
        ></star-rating
      ></span>
      <hr />

      <p style="color:red;">insert sort on the top right</p>

      <div
        class="user-reviews"
        v-for="(review, user) in bakery[0].reviews"
        :key="user"
      >
        <indiv-review v-bind:review="review"></indiv-review>
      </div>

      <p style="color:red;">insert pageination</p>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import database from "../firebase.js";
import firebase from "@firebase/app";
import ProductReview from './ProductReview';
require("firebase/auth");
export default {
  data() {
    return {
      docID: "",
      bakery: [],
      rating: 0,
      rating1: 0,
      total_reviews: 0,
      review: "",
    };
  },
  components: {
    "star-rating": StarRating,
    "indiv-review": ProductReview,
  },

  methods: {
    fetchItems: function () {
      database
        .collection("bakeriesNew")
        .doc(this.docID)
        .get()
        .then((snapshot) => {
          this.bakery.push(snapshot.data());
          this.rating = this.calAvgRating(
            snapshot.data().ratings,
            snapshot.data().total_ratings_by_users
          );
          this.total_reviews = snapshot.data().total_ratings_by_users;
        });
    },

    calAvgRating: function (rating, total_ratings) {
      var total_rating =
        rating[0] * 0 +
        rating[1] * 1 +
        rating[2] * 2 +
        rating[3] * 3 +
        rating[4] * 4 +
        rating[5] * 5;
      if (total_ratings == 0) {
        return 0;
      } else {
        var avg = total_rating / total_ratings;
        return Math.round(avg * 10) / 10;
      }
    },

    getName(user_id) {
      database.collection("Users").doc(user_id).get().then(doc => {
        this.curr_reviewer = doc.data().name;
      })
      return this.curr_reviewer;
    },

    setRating: function (rating) {
      this.rating1 = rating;
    },

    /*needs help*/
    submit: function () {
      //check if user log in, if not log in direct to login page
      if (!firebase.auth().currentUser) {
        this.$router.push({ path: "/login" });
      } else {
        //if user has review the shop, user cannot review it again
        database
          .collection("Users")
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then((snapshot) => {
            var reviews_arr = snapshot.data().reviews;
            var reviewed = false;
            for (var i = 0; i < reviews_arr.length; i++) {
              var curr_UID = reviews_arr[i].UID;
              if (curr_UID == this.docID) {
                reviewed = true;
                alert(
                  "Already reviewed in the past 3 months! (maybe can change this to popup instead of alert"
                );
              }
            }

            //if curr havent review the user before
            if (!reviewed) {
              database
                .collection("Users")
                .doc(firebase.auth().currentUser.uid)
                .update({
                  reviews: firebase.firestore.FieldValue.arrayUnion({
                    UID: this.docID,
                    rating: this.rating1,
                    review: this.review,
                    time: Date(),
                  }),
                });
              database
                .collection("Users")
                .doc(firebase.auth().currentUser.uid)
                .update({
                  total_review: firebase.firestore.FieldValue.increment(1),
                });
              var rating_number = parseInt(this.rating);
              database
                .collection("bakeriesNew")
                .doc(this.docID)
                .update({
                  reviews: firebase.firestore.FieldValue.arrayUnion({
                    user_id: firebase.auth().currentUser.uid,
                    rating: this.rating1,
                    review: this.review,
                    time: Date(),
                  }),
                  total_ratings_by_users: firebase.firestore.FieldValue.increment(
                    1
                  ),
                  review_users: firebase.firestore.FieldValue.arrayUnion(
                    firebase.auth().currentUser.uid
                  ),
                  [`ratings.${rating_number}`]: firebase.firestore.FieldValue.increment(
                    1
                  ),
                });
            }
          });
      }
    },
  },

  created() {
    this.docID = this.$route.query.id;
    this.fetchItems();
  },
};
</script>

<style scoped>
input {
  width: 750px;
  height: 150px;
  border-radius: 15px;
  align-items: center;
  font-size: 18px;
  text-indent: 15px;
  border: none;
  background-color: rgba(236, 235, 235, 0.733);
}

.ratings {
  display: flex;
  margin-top: 30px;
}

.stars {
  margin-top: 15px;
  margin-left: 25px;
}

button {
  border: none;
  background-color: #bbbbbb;
  border-radius: 15px;
  font-size: 1em;
  height: 40px;
  display: inline-block;
  width: fit-content;
  padding: 0 30px;
  margin-left: 400px;
  cursor: pointer;
}

.reviews > span {
  display: inline-flex;
}

hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  width: 750px;
  border-style: inset;
  border-width: 1px;
  background-color: none;
}

.user-reviews {
  margin-bottom: 50px;
}

#Name {
  color: rgb(101, 101, 101);
  text-decoration: underline;
}
</style>