<template>
    <div id="favourite">
        <img id="img2" v-bind:src="this.image2">

        <div id="shopDetails">
            <img id="img1" v-bind:src="this.image1">
            <!-- need to add routes to shop page -->
            <div id="name">{{this.shopName}}</div>
            <!-- replaced by star rating -->
            <div id="rating">{{this.rating}}</div>
            <div id="review">( {{this.reviewsNum}} reviews)</div>
            <!-- check fav and replaced by icon -->
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
                //this.rating = computeRating(data.Rating)
                this.reviewsNum = data.Reviews.length
            })
        }
    }
}

</script>

<style scoped> 
#favourite{
    border: 2px solid;
    border-color: rgb(214, 210, 206);
    overflow: auto;
}

#img2{
    width: 100%;
    text-align: left;
}

#img1{
    float:left;
    width: 20%;
    padding: 15px;
    padding-right: 35px;
}

#name{
    padding: 15px;
    color: rgb(179, 149, 110);
    text-decoration: underline;
    text-align: left;
    font-size: 20px;
    letter-spacing: 1px;
}

#rating{
    float: left;
    padding-bottom: 10px;
}

#fav{
    text-align: right;
    padding-right: 20px;
}

</style>