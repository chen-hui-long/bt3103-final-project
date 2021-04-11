<template>
  <div id="favourite">
    <img id="img2" v-on:click="toProduct" v-bind:src="this.image2">

    
    <div id="shopDetails">
      <img id="img1" v-bind:src="this.image1" />
      <div class="name" v-on:click="toProduct">{{ this.shopName }}</div>
      <div class = "wrapper">
      <div class="stars"
        ><star-rating
          v-bind:read-only="true"
          v-model="rating"
          v-bind:increment="0.1"
          v-bind:show-rating="false"
          v-bind:star-size="16"
          border-color="black"
          v-bind:border-width="3"
          v-bind:rounded-corners="true"
          inactive-color="white"
          active-color="black"
        ></star-rating
      ></div>
      <span id="fav" v-on:click="clickFav">♥</span>
    </div>
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
          this.rating = this.calAvgRating(snapshot.data().ratings, snapshot.data().total_ratings_by_users);
        });
    },

    calAvgRating(rating, total_ratings) {
      var total_rating = rating[0] * 0 + rating[1] * 1 + rating[2] * 2 + rating[3] * 3 + rating[4] * 4 + rating[5] * 5;
      if (total_ratings == 0) {
        return 0;
      } else {
        var avg = total_rating / total_ratings;
        return Math.round(avg * 10) / 10;
      }
    },

    toProduct() {
      this.$router.push({ path: "/product", query: { id: this.shopID } });
    },

    clickFav(){
      this.$emit('unfavShop', this.shopID)
    }

  },

  created() {
    this.fetchItem();
  },
};
</script>

<style scoped>
#favourite {
  border: 1.5px solid;
  border-color: rgb(214, 210, 206);
  border-radius: 12px;
  margin-left:20px;
  margin-right:20px;
  margin-top:15px;
  margin-bottom:15px;
  
}

#img2 {
  width: 280px;
  height: 280px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

}

#img2:hover {
  cursor:pointer;
}

#img1 {
  float: left;
  width: 80px;
  margin: 10px;

}

.name {
  padding: 10px 5px 5px;
  color: rgb(179, 149, 110);
  text-decoration: underline;
  text-align: left;
  font-size: 15px;
  letter-spacing: 1px;
  cursor: pointer;
}

#rating {
  float: left;
}

#fav {
  font-size: 30px;
  font-family: system-ui;
  text-align: right;
  padding-right: 10px;
  margin-top: 15px;
  margin-left: 30px;
  float: right;
  color: #a52a2a;
  cursor:pointer;
}

.wrapper {
  position: relative;
  display: inline-flex;
}

</style>