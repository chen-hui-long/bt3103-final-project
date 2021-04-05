<template>
    <div id="favourite">
        <!-- img id="img2" v-bind:src="this.image2"> -->

        <div id="shopDetails">
            <img id="img1" v-bind:src="this.image1">
            <!-- need to add routes to shop page -->
            <div id="name">{{this.shopName}}</div>
            <!-- replaced by star rating -->
            <div id="rating">{{this.rating}}</div>
            <div id="review"> ({{this.reviewsNum}} reviews)</div>
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
            shopName: "",
            image1: "",
            image2: "",
            rating: 0,
            reviewsNum: 0,
        }
    },

    props:['shopID'],

    components:{
        //Ratings,
    },

    methods:{
        fetchItem(){
            db.collection("bakeriesNew").doc(this.shopID).get().then(snapshot => {
                const data = snapshot.data()
                this.image1 = data.images[0]
                this.image2 = data.images[1]
                this.shopName = data.shop_name
                /*
                include a function to calculate average rating?
                this.rating = data.avgRating
                */
                this.reviewsNum = data.total_ratings_by_users
            })
        },


    },

    created(){
        this.fetchItem();
    }
}

</script>

<style scoped> 
#favourite{
    border: 2px solid;
    border-color: rgb(214, 210, 206);
    overflow: auto;
    margin: 10px 10px 25px 25px;
    border-radius: 12px;
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