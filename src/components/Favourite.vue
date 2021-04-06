<template>
  <div id="favourite">
    <!-- img id="img2" v-bind:src="this.image2"> -->

    <div id="shopDetails">
      <img id="img1" v-bind:src="this.image1" />
      <div class="name" v-on:click="toProduct">{{ this.shopName }}</div>
      <span class="stars"
        ><star-rating
          read-only="true"
          v-model="rating"
          increment="0.1"
          v-bind:show-rating="false"
          v-bind:star-size="16"
          border-color="black"
          border-width="3"
          rounded-corners="true"
          inactive-color="white"
          active-color="black"
        ></star-rating
      ></span>
      <!-- replaced by icon -->
      <div id="fav">♡</div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import db from "../firebase.js";

export default {
  data() {
    return {
      shopName: "",
      image1: "",
      image2: "",
      rating: null,
      reviewsNum: 0,
    };
  },

  props: ["shopID"],

  components: {
    "star-rating": StarRating,
  },

  methods: {
    fetchItem() {
      db.collection("bakeriesNew")
        .doc(this.shopID)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          this.image1 = data.images[0];
          this.image2 = data.images[1];
          this.shopName = data.shop_name;
          /*
                include a function to calculate average rating?
                this.rating = data.avgRating
                */
          this.reviewsNum = data.total_ratings_by_users;
        });
    },

    toProduct() {
      this.$router.push({ path: "/product", query: { id: this.shopID } });
    },
  },

  created() {
    this.fetchItem();
  },
};
</script>

<style scoped>
#favourite {
  border: 2px solid;
  border-color: rgb(214, 210, 206);
  overflow: auto;
  margin: 10px 10px 25px 25px;
  border-radius: 12px;
}

#img2 {
  width: 100%;
  text-align: left;
}

#img1 {
  float: left;
  width: 20%;
  padding: 15px;
  padding-right: 35px;
}

#name {
  padding: 15px;
  color: rgb(179, 149, 110);
  text-decoration: underline;
  text-align: left;
  font-size: 20px;
  letter-spacing: 1px;
}

#rating {
  float: left;
  padding-bottom: 10px;
}

#fav {
  text-align: right;
  padding-right: 20px;
}
</style>