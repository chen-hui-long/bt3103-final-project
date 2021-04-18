<template>
  <div class="dashboard">
    <div class="navbar">
      <NavBar></NavBar>
    </div>
    <div class="heading-db">
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
    </div>

    <div id="app-db">
      <div class="chart-div">
        <Doughnut @clicked="received"></Doughnut>
      </div>
      <div class="review-side">
        <!--
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
        -->
        <!--
        <div class="select">
          <MultiSelectRating
            v-on:input="clickMulti($event)"
          ></MultiSelectRating>
        </div>
        -->
        <div class="curr-filter">
          Viewing:
          <div class="filter">
            <ul class = "ul-filter">
              <li  class = "li-filter" v-for="filter in this.check_filter()" v-bind:key="filter">
                {{ filter }}
              </li>
            </ul>
          </div>
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
            :key="review_sorted"
            class="paginate-list"
            :per="3"
          >
            <li
              class="user-reviews"
              v-for="(review, user) in paginated('revs')"
              :key="user"
              v-bind:review="review"
            >
              <indiv-review v-bind:review="review"></indiv-review>
            </li>
          </paginate>
        </ul>
        <div id="page-number" v-if="reviews_unsorted.length > 0">
          <paginate-links for="revs" :show-step-links="true"></paginate-links>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import StarRating from "vue-star-rating";
import Doughnut from "./charts/Doughnut.vue";
import database from "../firebase.js";
import firebase from "@firebase/app";
import review from "./DashboardReview/DBreview.vue";
import NavBar from "./ProfileNavBar"
//import MultiSelectRating from "./DashboardReview/MultiSelectRating.vue";
require("firebase/auth");

export default {
  components: {
    Doughnut,
    NavBar,
    "star-rating": StarRating,
    "indiv-review": review,
    //MultiSelectRating,
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
      new_filter: [],
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

    new_visible(review) {
      if (this.new_filter.length == 0) {
        return true;
      } else {
        if (this.new_filter.includes(0)) {
          if (review.rating == 0) {
            return true;
          }
        }
        if (this.new_filter.includes(1)) {
          if (review.rating == 1) {
            return true;
          }
        }
        if (this.new_filter.includes(2)) {
          if (review.rating == 2) {
            return true;
          }
        }
        if (this.new_filter.includes(3)) {
          if (review.rating == 3) {
            return true;
          }
        }
        if (this.new_filter.includes(4)) {
          if (review.rating == 4) {
            return true;
          }
        }
        if (this.new_filter.includes(5)) {
          if (review.rating == 5) {
            return true;
          }
        }
      }
    },

    check_filter() {
      var arr = [];
      if (this.new_filter.length == 0) {
        arr.push("All Reviews");
      } else {
        var str = " stars review";
        for (var i = 0; i < this.new_filter.length; i++) {
          arr.push(this.new_filter[i] + str);
        }
      }
      return arr;
    },

    received: function (event) {
      var index = event.index;
      if (this.new_filter.includes(index)) {
        var arr = this.new_filter.filter(function (e) {
          return e !== index;
        });
        this.new_filter = arr;
      } else {
        this.new_filter.push(index);
      }
    },
  },

  computed: {
    review_sorted() {
      var sorted = [];
      for (var i = 0; i < this.reviews_unsorted.length; i++) {
        if (this.new_visible(this.reviews_unsorted[i])) {
          sorted.push(this.reviews_unsorted[i]);
        }
      }
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
.heading-db {
  display: flex;
  justify-content: center;
}

.navbar {
  text-align: center;
}
#app-db {
  display: flex;
}

.chart {
  margin-top: 20px;
}

.chart-div {
  width: 50%;
}

.review-side {
  width: 50%;
  margin-right: 40px;
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
}

.select {
  margin: 20px;
}

div#sorting {
  margin: 20px;
}

div.curr-filter {
    margin: 20px;
}

h3 {
  text-align: center;
}

.ul-filter {
  display:flex;
}

.li-filter {
  margin-right:10px;
  margin-left:0px;
  margin-top: 0px;
  margin-bottom: 0px;
  padding:10px;
}
#page-number > ul {
  display: flex;
  list-style-type: none;
  margin: 20px;
}

.dashboard {
  margin-bottom: 80px;
}
</style>