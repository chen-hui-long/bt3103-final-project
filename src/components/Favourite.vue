<template>
  <div id="favourite">
    <img id="img2" v-bind:src="this.image2">

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
      <div id="fav" v-on:click="clickFav">♥</div>
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
      this.$emit('changeFav',this.shopID)
    }

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
  width: 262px;
  height: 250px;

}

#img1 {
  float: left;
  width: 100px;

}

.name {
  padding: 15px;
  color: rgb(179, 149, 110);
  text-decoration: underline;
  text-align: left;
  font-size: 15px;
  letter-spacing: 1px;
}

#rating {
  float: left;
}

#fav {
  font-size: 20px;
  font-family: system-ui;
  font-weight: 500;
  text-align: right;
  padding-right: 20px;
  float: right;
  color: rgb(206, 58, 58);
}

</style>