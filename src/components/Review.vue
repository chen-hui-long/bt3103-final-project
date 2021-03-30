<template> 
    <div class="review">

        <img src="this.imageURL">

        <div id="name">{{this.shopName}}</div>
        <!-- check fav -->
        <div id="fav">♡</div>
        <div id="text">{{this.text}}</div>
        <!-- add rating -->

    </div>

</template>

<script> 
import db from '../firebase.js'

export default{
    data(){
        return{
            shopName: this.review.id,
            text: this.review.review,
            rating: this.review.rating,
            imageURL: "",
        }
    },

    props:['review'],

    methods:{
        findImage(){
            db.collection("bakeries").doc(this.review.id).get().then(snapshot => {
                this.imageURL = snapshot.data().ImageURL[0]
            })
        }
    },

    created(){
        this.findImage()
    }
}


</script>

