<template>
  <div>
    <div class="users"><img />profile pic</div>
    <p id="Name">{{this.reviewer_name}}</p>
    <star-rating
      v-bind:read-only="true"
      v-bind:rating="this.review.rating"
      v-bind:increment="0.1"
      v-bind:show-rating="false"
      v-bind:star-size="16"
      border-color="black"
      v-bind:border-width="3"
      v-bind:rounded-corners="true"
      inactive-color="white"
      active-color="black"
    ></star-rating>
    {{ review.review }}
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import db from "../firebase.js";
export default {
  components: {
    "star-rating": StarRating,
  },

  data() {
    return {
        reviewer_name:"", 
        rating:0, 
        review_given:"", 
        date:"", 
        profile_pic: "",
    };
  },

  props: ["review"],

  methods: {
      fetchItems() {
          this.rating = this.review.rating
          this.review_given = this.review.review
          this.date = this.time;
          db.collection("Users").doc(this.review.user_id).get().then((doc) => {
              this.reviewer_name = doc.data().name
              this.profile_pic = doc.data().image
          })
      }
  },

  
  
  
  created() {
      this.fetchItems();
  }



};
</script>

<style scoped>
</style>