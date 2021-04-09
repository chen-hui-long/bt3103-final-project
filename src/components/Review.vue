<template>
  <div class="review">
    <div id="reviewDetails">
      <img v-bind:src="this.image" />
      <div id="name" v-on:click="toProduct">{{ this.shopName }}</div>
      <div id="text">{{ this.review }}</div>
      <div id="time">{{ this.date }}</div>
      <span class="stars"
        ><star-rating
          v-bind:read-only= "true"
          v-model="rating"
          v-bind:increment="0.1"
          v-bind:show-rating= false
          v-bind:star-size="16"
          border-color="black"
          v-bind:border-width="3"
          v-bind:rounded-corners= true 
          inactive-color="white"
          active-color="black"
        ></star-rating
      ></span>
      <!-- check fav, replaced by heart icon -->
      <div id="fav">♡</div>
    </div>
  </div>
</template>

<script>
import db from "../firebase.js";
import StarRating from "vue-star-rating";

export default {
  components: {
    "star-rating": StarRating,
  },
  data() {
    return {
      shopName: "",
      review: "",
      rating: null,
      image: "",
      date: "",
    };
  },

  props: ["rev"],

  methods: {
    
    toDate() {
      var time = new Date(this.rev.time.seconds);
      this.date =
        time.getDate().toString() +
        "/" +
        (time.getMonth() + 1).toString() +
        "/" +
        time.getFullYear().toString().substr(-2);
    },
    // though works, the time seems incorrect
    

    fetchItem() {
      this.review = this.rev.review;
      this.rating = this.rev.rating;
      db.collection("bakeriesNew")
        .doc(this.rev.UID)
        .get()
        .then((snapshot) => {
          this.image = snapshot.data().images[0];
          this.shopName = snapshot.data().shop_name;
          this.total_ratings = snapshot.data().total_ratings_by_users;
        });
    },

    toProduct() {
      this.$router.push({ path: "/product", query: { id: this.rev.UID } });
    },
  },

  created() {
    this.fetchItem();
  },
};
</script>


<style scoped>
* {
  position: -webkit-sticky;
}

.review {
  border: 2px solid;
  border-color: rgb(214, 210, 206);
  overflow: auto;
  margin: 10px 10px 25px 25px;
  border-radius: 12px;
}

img {
  float: left;
  width: 150px;
  padding: 15px;
}

#name {
  padding: 15px;
  color: rgb(179, 149, 110);
  text-decoration: underline;
  text-align: left;
  font-size: 18px;
  letter-spacing: 1px;
}

#fav {
    line-height: 40px;
    font-size: 20px;
    font-family: system-ui;
    font-weight: 500;  

  text-align: right;
  padding-right: 20px;
}

#time {
  text-align: left;
  float: left;
  width: 10%;
  padding-right: 20px;
}

#rating {
  float: left;
}

#second:after {
  content: "";
  clear: both;
  display: table;
}
</style>


