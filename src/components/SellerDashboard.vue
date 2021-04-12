<template>
  <div id="app">
    <BarChart></BarChart>
    <h3>{{ this.total_reviews }} Reviews</h3>
    <div class="reviews-top">
      <span class="stars"
        ><star-rating
          v-bind:read-only="true"
          v-bind:increment="0.1"
          v-bind:rating="this.rating1"
          v-bind:show-rating="false"
          v-bind:star-size="16"
          border-color="black"
          v-bind:border-width="3"
          v-bind:rounded-corners="true"
          inactive-color="white"
          active-color="black"
        ></star-rating
      ></span>
    </div>
    <div
      class="user-reviews"
      v-for="(review, user) in reviews_unsorted"
      :key="user"
      v-bind:review="review"
    >
      <indiv-review v-bind:review="review"></indiv-review>
    </div>
  </div>
</template>
 
<script>
import StarRating from "vue-star-rating";
import BarChart from "./charts/Bar.vue";
import database from "../firebase.js";
import firebase from "@firebase/app";
import review from "./DashboardReview/DBreview.vue";
require("firebase/auth");

export default {
  components: {
    BarChart,
    "star-rating": StarRating,
    "indiv-review": review,
  },

  data: function () {
    return {
      bakery: [],
      rating1: 0,
      total_reviews: 0,
      review: "",
      sort_by: "new",
      reviews_unsorted: [],
      owner: "",
    };
  },

  methods: {
    fetchItems: function () {
      database
        .collection("bakeriesNew")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
          this.bakery.push(snapshot.data());
          this.rating1 = this.calAvgRating(
            snapshot.data().ratings,
            snapshot.data().total_ratings_by_users
          );
          this.reviews_unsorted = snapshot.data().reviews;
          this.total_reviews = snapshot.data().total_ratings_by_users;
          this.owner = snapshot.data().owner;
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
        return Math.round(avg * 100) / 100;
      }
    },
  },

  created: function () {
    this.fetchItems();
  },
};
</script>
 <style scoped>
</style>