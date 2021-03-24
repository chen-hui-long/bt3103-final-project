<template>
    <div class="review-wrapper">
        <div><h3>Review this shop</h3></div>
        <input type="text" placeholder="Leave a review here" />
        
        <div class="ratings">
            <span><h3>Ratings:</h3></span> 
            <span class="stars"><star-rating v-bind:show-rating="false" v-bind:star-size="20" 
            border-color="black" border-width="3" rounded-corners=true 
            inactive-color="white" active-color="black"></star-rating></span>
            <!--span class="stars"><ratings></ratings></span-->
            <button type="submit">Submit</button>
        </div>

        <div class="reviews">
            <span><h3>### Reviews</h3></span>
            <!-- to  retrieved star ratings from database-->
            <span class="stars"><star-rating read-only="true" rating="5" v-bind:show-rating="false" v-bind:star-size="16" 
            border-color="black" border-width="3" rounded-corners=true 
            inactive-color="white" active-color="black"></star-rating></span>
            <hr/>

            <p>insert sort</p>

            <div class="users">
            <img>profile pic
            </div>
            
        </div>
    </div>
    

</template>

<script>
/*import Ratings from './Ratings.vue'
export default {
  components:{
    'ratings': Ratings
  }
};*/

import StarRating from 'vue-star-rating'
export default {
    components:{
        'star-rating':StarRating
    },
}
</script>

<style scoped>
input{
    width: 750px;
    height: 150px;
    border-radius: 15px;
    align-items: center;
    font-size: 18px;
    text-indent: 15px;
    border: none;
    background-color: rgba(236, 235, 235, 0.733);
}

.ratings {
    display:flex;
    margin-top: 30px;

}

.stars{
    margin-top: 15px;
    margin-left: 25px;
}

button {
    border:none;
    background-color: #bbbbbb;
    border-radius: 15px;
    font-size: 1em;
    height: 40px;
    display:inline-block;
    width:fit-content;
    padding: 0 30px;
    margin-left: 400px;
    cursor: pointer;
}

.reviews > span {
    display:inline-flex;
}

hr {
    display: block;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    width: 750px;
    border-style:inset;
    border-width: 1px;
    background-color: none;
}
</style>