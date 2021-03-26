<template>
    <body>
        <!--div class="breadcrumb-wrap">
            <ul class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Vegan</a></li>
                <li class="breadcrumb-item active">Product List</li>
            </ul>
        </div-->

        <div class="breadcrumb-wrap">
        <h3>Insert breadcrumb aka the sub navigation</h3>
        </div>

        <div class="product-content">
            <div class="product-content-left">
            <image-slider></image-slider>
            </div>

            
            <div class="product-content-right">
            
            <div class="title"><h1>Lilac Oak</h1></div>
            <p class="description">Insert description</p>

            <div class="menu">
                <span class="subtitle">Menu</span>
                <!--v-if to change button sign?-->
                <!--button class="down-arrow" style="margin-left:80%;" v-bind:class="{active:isActive}" @click="toggle()">{{isActive? "&#8963;" : "&#8964;"}}</button-->
                <button class="down-arrow" style="margin-left:80%;" v-bind:class="{active:isActive}" @click="toggle()">&#8964;</button>
                <p class="description">Insert description</p>
            </div>

            <div class="highlights">
                <span class="subtitle">Highlights</span>
                <button class="down-arrow" style="margin-left:68%;">&#8964;</button>
                <p class="description">Insert description</p>
            </div>


            <div class="delivery">
                <span class="subtitle">Delivery/ Collection</span>
                <button class="down-arrow" style="margin-left:180px;">&#8964;</button>
                <p class="description">Insert description</p>
            </div>

            <div class="ig">
                <p style="font-weight:bold;">IG:</p>
            <p class="description">@insert ig</p>
            </div>
    
            </div>
        </div>

        <div class="review">
        <reviews></reviews>
        </div>

  </body>
</template>

<script>
import ImageSlider from './ImageSlider.vue'
import Reviews from './Reviews'
/*import Ratings from './Ratings.vue'*/
export default {
    data() {
        return {
            isActive: false
        }
    },
  components:{
    'image-slider':ImageSlider,
    'reviews':Reviews
    /*'ratings': Ratings*/
  },
  methods:{
      toggle() {
        if (!this.isActive) {
            this.isActive = true;
        } else {
            this.isActive = false;
        }
    }
  }
};
</script>

<style scoped>


.breadcrumb-wrap {
    position: relative;
    width: 100%;
}
/*
.breadcrumb-wrap .breadcrumb {
    margin: 0;
    padding: 0;
    background: transparent;
}

.breadcrumb li {
    display: inline-block;
    white-space: nowrap;
}
.breadcrumb > .active {
    color: #37474f;
    font-weight: bold;
}
.breadcrumb > li a {
    color: #515356;
}*/


.product-content {
    display:inline-flex;
    margin-top: 50px;
}

.product-content-left{
    position:relative;
    left: 80px;
    display:flex;
}

.product-content-right{
    position:relative;
    left: 800px;
    display:inline-block;    
}


.ig {
    display:flex;
    font-size: 18px;
}



.down-arrow {
    background: none;
    border: none;
    font-weight: bolder;
    cursor: pointer;
    /*font-size: 1.5em;*/
}

.title {
    color:#a19090;
    letter-spacing: 1px;
}
.subtitle {
    font-weight:bold;
    font-size: 18px;
}

.description {
    font-size: 18px;
}

.review{
    margin-top: 150px;
    margin-left: 50px;
}
</style>