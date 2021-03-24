<template>
    <div class="rate">
        <star-rating v-bind:show-rating="false" v-bind:star-size="20" border-color="black" border-width="3" rounded-corners=true inactive-color="white" active-color="black"></star-rating>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
    components:{
        'star-rating':StarRating
    },
    /*methods: {
    setRating: function(rating) {
      this.rating = "You have Selected: " + rating + " stars";
    },
    showCurrentRating: function(rating) {
      this.currentRating = (rating === 0) ? this.currentSelectedRating : "Click to select " + rating + " stars"
    },
    setCurrentSelectedRating: function(rating) {
      this.currentSelectedRating = "You have Selected: " + rating + " stars";
    }
  },
  data() {
      return{
    rating: "No Rating Selected",
    currentRating: "No Rating",
    currentSelectedRating: "No Current Rating",
  }
  }*/
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}


</style>