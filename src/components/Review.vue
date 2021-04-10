<template>
  <div class="review">
      <img v-bind:src="this.image" />
      <div id="name" v-on:click="toProduct">{{ this.shopName }}</div>
      <div id="text">{{ this.review }}</div>
      <span class="stars"
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
      ></span>
      <div id="fav" v-show="this.checkFav">♥</div>
      <div id="not-fav" v-show="!(this.checkFav)">♡</div>
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

  props: ["rev", "checkFav"],

  methods: {
    fetchItem() {
      this.review = this.rev.review;
      this.rating = this.rev.rating;
      db.collection("bakeriesNew")
        .doc(this.rev.UID)
        .get()
        .then((snapshot) => {
          this.image = snapshot.data().images[0];
          this.shopName = snapshot.data().shop_name;
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


.review {
  border: 2px solid;
  border-color: rgb(214, 210, 206);
  overflow: auto;
  margin: 10px 10px 25px 25px;
  border-radius: 12px;
  height: 155px;
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

#name:hover{
  color: rgb(139, 115, 82);
}

#text {
  word-wrap: normal;
  padding-bottom: 10px;
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

#not-fav {
  font-size: 20px;
  font-family: system-ui;
  font-weight: 500;
  text-align: right;
  padding-right: 20px;
  float: right;
}

#rating {
  float: left;
}
</style>


