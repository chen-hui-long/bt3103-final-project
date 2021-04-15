<template>
  <div id="app">
    <br />
    <BarChart></BarChart>
    <div class="reviews-top">
      <h3>{{ this.total_reviews }} Reviews</h3>
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
    <div class="select">
      <MultiSelectRating v-on:input="clickMulti($event)"></MultiSelectRating>
    </div>
    <div id="sorting">
      Sort by:
      <select id="sort" v-model="sort_by">
        <option value="new" selected>Date (Newest)</option>
        <option value="old" selected>Date (Oldest)</option>
        <option value="ratings_ascending">Ratings (Ascending)</option>
        <option value="ratings_descending">Ratings (Descending)</option>
      </select>
    </div>
    <ul>
      <paginate
        name="revs"
        :list="review_sorted"
        class="paginate-list"
        :per="5"
      >
        <li
          class="user-reviews"
          v-for="(review, user) in paginated('revs')"
          :key="user"
          v-bind:review="review"
          v-show="visible(review)"
        >
          <indiv-review v-bind:review="review"></indiv-review>
        </li>
      </paginate>
    </ul>
    <div id="page-number">
      <paginate-links for="revs" :show-step-links="true"></paginate-links>
    </div>
  </div>
</template>
 
<script>
import StarRating from "vue-star-rating";
import BarChart from "./charts/Bar.vue";
import database from "../firebase.js";
import firebase from "@firebase/app";
import review from "./DashboardReview/DBreview.vue";
import MultiSelectRating from "./DashboardReview/MultiSelectRating.vue";
require("firebase/auth");

export default {
  components: {
    BarChart,
    "star-rating": StarRating,
    "indiv-review": review,
    MultiSelectRating,
  },

  data: function () {
    return {
      bakery: [],
      rating1: 0,
      total_reviews: 0,
      sort_by: "new",
      reviews_unsorted: [],
      filter: [],
      paginate: ["revs"],
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

    clickMulti: function (event) {
      this.filter = [];
      for (var i = 0; i < event.length; i++) {
        this.filter.push(event[i].type);
      }
      console.log(this.filter);
    },

    visible(review) {
      if (this.filter.length == 0) {
        return true;
      } else {
        if (this.filter.includes("0 Star Review")) {
          if (review.rating == 0) {
            return true;
          }
        }
        if (this.filter.includes("1 Star Review")) {
          console.log("test");
          if (review.rating == 1) {
            return true;
          }
        }
        if (this.filter.includes("2 Stars Review")) {
          if (review.rating == 2) {
            return true;
          }
        }
        if (this.filter.includes("3 Stars Review")) {
          if (review.rating == 3) {
            return true;
          }
        }
        if (this.filter.includes("4 Stars Review")) {
          if (review.rating == 4) {
            return true;
          }
        }
        if (this.filter.includes("5 Stars Review")) {
          if (review.rating == 5) {
            return true;
          }
        }
      }
    },
  },

  computed: {
    review_sorted() {
      var sorted = this.reviews_unsorted;
      if (this.sort_by == "ratings_ascending") {
        sorted.sort(function (a, b) {
          return a.rating - b.rating;
        });
      } else if (this.sort_by == "ratings_descending") {
        sorted.sort(function (a, b) {
          return b.rating - a.rating;
        });
      } else if (this.sort_by == "new") {
        sorted.sort(function (a, b) {
          return new Date(b.time) - new Date(a.time);
        });
      } else if (this.sort_by == "old") {
        sorted.sort(function (a, b) {
          return new Date(a.time) - new Date(b.time);
        });
      }
      return sorted;
    },
  },

  created: function () {
    this.fetchItems();
  },
};
</script>
 <style scoped>
#app {
  width: 85%;
  margin: auto;
}
ul {
  padding: 0;
  list-style-type: none;
}
li {
  list-style: none;
  border: 1.5px solid;
  border-color: rgb(214, 210, 206);
  border-radius: 12px;
  margin: 20px;
}

.reviews-top {
  margin: 20px;
  margin-top: 80px;
}

.select {
  margin: 20px;
}

div#sorting {
  margin: 20px;
}

#page-number > ul {
  display: flex;
  list-style-type: none;
}
</style>