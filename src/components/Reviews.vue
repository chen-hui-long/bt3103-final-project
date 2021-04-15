<template>
  <div class="review-wrapper">
    <div><h3>Review this shop</h3></div>
    <form>
      <textarea type="obs" placeholder="Leave a review here" v-model="review" />

      <div class="ratings">
        <span><h3>Ratings:</h3></span>
        <span class="stars"
          ><star-rating
            v-bind:show-rating="false"
            v-bind:star-size="20"
            @rating-selected="setRating"
            border-color="black"
            v-bind:border-width="3"
            v-bind:rounded-corners="true"
            inactive-color="white"
            active-color="black"
            v-model="this.rating"
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
      <hr />

      <div id="sorting">
        Sort by:
        <select id="sort" v-model="sort_by">
          <option value="new" selected>Date (Newest)</option>
          <option value="old" selected>Date (Oldest)</option>
          <option value="ratings_ascending">Ratings (Ascending)</option>
          <option value="ratings_descending">Ratings (Descending)</option>
        </select>
      </div>

      <paginate
        name="reviews"
        :list="review_sorted"
        class="paginate-list"
        :per="3"
      >
        <div
          class="user-reviews"
          v-for="(review, user) in paginated('reviews')"
          :key="user"
          v-bind:review="review"
        >
          <indiv-review v-bind:review="review"></indiv-review>
        </div>
      </paginate>
    </div>
    <div id="page-number">
      <paginate-links for="reviews" :show-step-links="true"></paginate-links>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import database from "../firebase.js";
import firebase from "@firebase/app";
import ProductReview from "./ProductReview";
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
      sort_by: "new",
      reviews_unsorted: [],
      owner: "",
      paginate: ["reviews"],
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
          this.rating1 = this.calAvgRating(
            snapshot.data().ratings,
            snapshot.data().total_ratings_by_users
          );
          this.reviews_unsorted = snapshot.data().reviews;
          console.log(this.reviews_unsorted);
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

    getName(user_id) {
      database
        .collection("Users")
        .doc(user_id)
        .get()
        .then((doc) => {
          this.curr_reviewer = doc.data().name;
        });
      return this.curr_reviewer;
    },

    setRating: function (rating) {
      //this.rating1 = rating;
      this.rating = rating;
      console.log(this.rating);
    },

    /*needs help*/
    submit: function () {
      //check if user log in, if not log in direct to login page
      if (!firebase.auth().currentUser) {
        this.$router.push({ path: "/login" });
      } else {
        //if the current user is the owner, he cannot review
        if (this.owner == firebase.auth().currentUser.uid) {
          this.$swal({
            icon: "error",
            text: "You are not allowed to leave review for your own listing",
            confirmButtonColor: "#000000",
          });
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
                  this.$swal({
                    icon: "error",
                    text:
                      "You have already reviewed this bakery in the past 3 months.",
                    confirmButtonColor: "#000000",
                  });
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
                      rating: this.rating,
                      review: this.review,
                      time: Date(),
                    }),
                  })
                  .then(() => {
                    database
                      .collection("Users")
                      .doc(firebase.auth().currentUser.uid)
                      .update({
                        total_review: firebase.firestore.FieldValue.increment(
                          1
                        ),
                      })
                      .then(() => {
                        var rating_number = parseInt(this.rating);
                        database
                          .collection("bakeriesNew")
                          .doc(this.docID)
                          .update({
                            reviews: firebase.firestore.FieldValue.arrayUnion({
                              user_id: firebase.auth().currentUser.uid,
                              rating: this.rating,
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
                          })
                          .then(() => {
                            location.reload();
                          });
                      });
                  });
                /*  IGNORE ALL THIS 
                database
                  .collection("Users")
                  .doc(firebase.auth().currentUser.uid)
                  .update({
                    total_review: firebase.firestore.FieldValue.increment(1),
                  });
                  */
                /*
                var rating_number = parseInt(this.rating);
                database
                  .collection("bakeriesNew")
                  .doc(this.docID)
                  .update({
                    reviews: firebase.firestore.FieldValue.arrayUnion({
                      user_id: firebase.auth().currentUser.uid,
                      rating: this.rating,
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
                  */
                //location.reload();
              }
            });
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

  created() {
    this.docID = this.$route.query.id;
    this.fetchItems();
  },
};
</script>

<style scoped>
textarea {
  width: 750px;
  height: 145px;
  border-radius: 20px;
  font-size: 20px;
  text-indent: 15px;
  border: none;
  resize: none;
  background-color: rgba(236, 235, 235, 0.555);
  padding-top: 15px;
}

.ratings {
  display: flex;
  margin-top: 15px;
}

.stars {
  margin-top: 15px;
  margin-left: 25px;
}

button {
  border: none;
  background-color: #bbbbbb;
  border-radius: 15px;
  font-size: 1.2em;
  height: 40px;
  display: inline-block;
  width: fit-content;
  padding: 0 30px;
  margin-left: 380px;
  margin-top: 35px;
  cursor: pointer;
}

.reviews > span {
  display: inline-flex;
  margin-top: 30px;
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

#sorting {
  margin-left: 450px;
  font-weight: bold;
  margin-bottom: 30px;
}

#sort {
  border: none;
  outline-style: none;
  cursor: pointer;
}

#page-number  > ul {
  display: flex;
  list-style-type: none;
}

</style>