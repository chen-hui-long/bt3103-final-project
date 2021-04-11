<template>
  <div class="review">
      <img v-bind:src="this.image" />
      <div class="wrapper">
      <span id="name" v-on:click="toProduct">{{ this.shopName }}</span>
      <span id="fav" v-show="this.checkFav">♥</span>
      <span id="not-fav" v-show="!(this.checkFav)">♡</span>
      </div>
      <div id="text">{{ this.review }}</div>
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
        ></star-rating>
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
      shopID: null,
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
        .doc(this.shopID)
        .get()
        .then((snapshot) => {
          this.image = snapshot.data().images[0];
          this.shopName = snapshot.data().shop_name;
        });
    },

    toProduct() {
      this.$router.push({ path: "/product", query: { id: this.rev.UID } });
    },

    favShop(){
      this.$emit("favShop", this.shopID)
    },

    unfavShop(){
      this.$emit("unfavShop", this.shopID);
    },
  },

  created() {
    this.shopID = this.rev.UID;
    this.fetchItem();
  },
};
</script>


<style scoped>


.review {
  border: 2px solid;
  border-color: rgb(214, 210, 206);
  overflow: auto;
  margin: 50px -10px 150px 80px;
  border-radius: 12px;
  height: 155px;
}



img {
  float: left;
  width: 150px;
  padding: 15px;
}

#name {
  color: rgb(179, 149, 110);
  text-decoration: underline;
  text-align: left;
  font-size: 18px;
  letter-spacing: 1px;
}

#name:hover{
  color: rgb(139, 115, 82);
  cursor: pointer;
}

#text {
  word-wrap: normal;
  padding-bottom: 10px;
}

.stars {
  margin-top: 10px;
}

#fav {
  font-size: 30px;
  font-family: system-ui;
  font-weight: 500;
  text-align: right;
  margin-left: 300px;
  float: right;
  color: #a52a2a;
}

#not-fav {
  font-size: 30px;
  font-family: system-ui;
  text-align: right;
  margin-left: 300px;
  float: right;
}

#rating {
  float: left;
}

.wrapper {
  display: flex;
  padding-top: 10px;
}

</style>


