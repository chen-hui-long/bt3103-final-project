<template>
  <div>
    <div class="date-box">
      <span id="Date">{{ this.getTime() }}</span>
    </div>
    <div class="users">
      <img id="profile-pic" v-bind:src="profile_pic" />
      <div class="wrapper">
        <span id="Name">{{ this.getName() }}</span>
        <p>
          {{ review.review }}
        </p>
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
        >
        </star-rating>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import db from "../firebase.js";
import moment from "moment";
export default {
  components: {
    "star-rating": StarRating,
  },

  data() {
    return {
      reviewer_name: "",
      rating: 0,
      review_given: "",
      date: "",
      profile_pic: "",
    };
  },

  props: ["review"],

  methods: {
    getName() {
      db.collection("Users")
        .doc(this.review.user_id)
        .get()
        .then((doc) => {
          this.reviewer_name = doc.data().name;
          this.profile_pic = doc.data().image;
        });
      return this.reviewer_name;
    },

    getTime() {
      return moment(this.review.time).format("DD/MM/YYYY");
    },
  },

  created() {},
};
</script>

<style scoped>
#profile-pic {
  border-radius: 50%;
  width: 75px;
  height: 75px;
}

#Name {
  text-decoration: underline;
  color: #565656df;
  font-size: 16px;
}

.date-box {
  width: 120%;
  display: flex;
  justify-content: flex-end;
  /*margin-left: 40em;*/
  font-size: 14px;
  color: #565656df;
}

.users {
  display: flex;
}

.wrapper {
  margin-left: 1.5em;
  margin-bottom: 0em;
  font-size: 14px;
}


</style>