<template> 
    <div class="review">

        <div id="first">
            <img v-bind:src="this.imageURL">
            
            <div id="firstLine">
                <div id="name">{{this.shopName}}</div>
        <!-- check fav, replaced by heart icon -->
                <div id="fav">♡</div>
            </div>

            <div id="text">{{this.text}}</div>
        </div>

        <div id="second">
            <!-- add time --><div id="time">{{this.time}}</div>
            <!-- add rating --><div id="rating">{{this.rating}}</div>
        </div>

    </div>

</template>

<script> 
import db from '../firebase.js'

export default{
    data(){
        return{
            shopName: "",
            text: "",
            rating: 0,
            imageURL: "",
            time: "",
        }
    },

    props:['review'],

    methods:{
        findImage(){
            db.collection("bakeriesNew").doc(this.review.id).get().then(snapshot => {
                this.imageURL = snapshot.data().ImageURL[0]
            })
        }
    },

    created(){
        this.shopName = this.review.id
        this.text = this.review.review
        this.rating=  this.review.rating
        this.time = this.review.time
        this.findImage()
    }
}


</script>

<style scoped> 
*{
    position:-webkit-sticky;
}

.review{
    border-radius: 10px;
    border: 2px solid;
    overflow: auto;
    padding: 20px;
    border-color:rgb(214, 210, 206);
}

#img{
    float: left;
    width: 10%;
    padding-bottom: 20px;
    padding-right: 20px;
}

#name{
    text-align: left;
    float: left;
    color: rgb(179, 149, 110);
}

#heart{
    float: right;
    padding: 5px;
}

#text{
    text-align: left;
    font-weight: 5px;
    padding-bottom: 15px;
}

#firstLine:after{
    content: "";
    clear: right;
    display: table;
}

#first:after{
    content: "";
    clear: both;
    display: table;
}

#time{
    text-align: left;
    float: left;
    width: 10%;
    padding-right: 20px;
}

#rating{
    float: left;
}

#second:after{
    content: "";
    clear: both;
    display: table;
}


</style>


