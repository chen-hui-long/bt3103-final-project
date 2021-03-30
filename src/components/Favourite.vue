<template>
    <div id="favourite">
        <img v-bind:src="this.image2">

        <div id="shopDetails">
            <img v-bind:src="this.image1">
            <div id="name">{{this.shopName}}</div>
            <!-- add rating -->
            <div id="review">( {{this.reviewsNum}} reviews)</div>
            <!-- check fav -->
            <div id="fav">♡</div>
        </div>

    </div>


</template>

<script> 
//import Ratings from './Ratings.vue'
import db from '../firebase.js'

export default{
    data(){
        return{
            image1: "",
            image2: "",
            rating: 0,
            reviewsNum: 0,
        }
    },

    props:['shopName'],

    components:{
        //Ratings,
    },

    methods:{
        fetchItem(){
            db.collection("bakeries").doc(this.shopName).get().then(snapshot => {
                const data = snapshot.data()
                this.image1 = data.ImageURL[0]
                this.image2 = data.ImageURL[1]
                this.rating = computeRating(data.Rating)
                this.reviewsNum = data.Reviews.length
            })
        }
    }
}

</script>

<style scoped> 
.fav {
    cursor: pointer;
    transition: all 250ms;
    width: 50px;
    border-radius:50%;
    border:none;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    background-color:white;
}
</style>