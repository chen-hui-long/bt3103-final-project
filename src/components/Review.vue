<template>
  <div class="review">
    <div class="fav-div">
      <span id="not-fav" v-show="!this.checkFav" v-on:click="favShop">♡</span>
      <span id="fav" v-show="this.checkFav" v-on:click="unfavShop"
        ><div id="fav2">♥</div></span
      >
    </div>
    <div class="content">
      <div class="profile-img">
        <img v-bind:src="this.image" v-on:click="toProduct" />
      </div>
      <div class="wrapper">
        <div class="name-container">
          <span id="name" v-on:click="toProduct">{{ this.shopName }}</span>
        </div>
        <!--
      <span id="fav" v-show="this.checkFav" v-on:click="unfavShop"
        ><div id="fav2">♥</div></span
      >
      <div class="fav-container">
        <span id="not-fav" v-show="!this.checkFav" v-on:click="favShop">♡</span>
      </div>
      -->
      <div id="text">{{ this.review }}</div>
      <br>
      <br>
      <div class="stars">
        <star-rating
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

    favShop() {
      this.$emit("favShop", this.shopID);
    },

    unfavShop() {
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
  /*overflow: auto;*/
  border-radius: 12px;
  margin-top:20px;
  margin-bottom: 20px;;
}

img {
  width: 150px;
  height: 150px;
}

img:hover {
  cursor: pointer;
}

#name {
  color: #ae6e3b;
  text-decoration: underline;
  text-align: left;
  font-size: 18px;
  letter-spacing: 1px;
}

#name:hover {
  color: rgb(139, 115, 82);
  cursor: pointer;
}

#text {
  word-wrap: normal;
}


#fav {
  /*text-align: right;
  float: right;*/
  font-size: 30px;
  font-family: system-ui;
  font-weight: 500;
  color: #a52a2a;
}

#not-fav {
  font-size: 30px;
  font-family: system-ui;
  /*padding: none;*/
  /*margin-left: 200px;
  margin-right: 50px;*/
}

#not-fav:hover {
  cursor: pointer;
  color: #d68577;
}

#fav:hover {
  cursor: pointer;

}

.fav-div {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
}

.content {
  display: flex;
}

.stars {
  position:absolute;                  /* added */
  bottom:0; 
  margin-bottom: 20px;
}

.profile-img {
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  margin-left: 20px;
  margin-right:20px;
  margin-bottom: 20px;
}

.wrapper {
  position:relative;
}
</style>


