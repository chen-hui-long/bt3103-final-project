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
            
            <div class="title"><h3>Product Name</h3></div>
            <p class="description">Insert description</p>

            <div class="menu">
                <span class="subtitle">Menu</span>
                <button class="down-arrow">&#8964;</button>
                <p class="description">Insert description</p>
            </div>

            <div class="highlights">
                <span class="subtitle">Highlights</span>
                <button class="down-arrow">&#8964;</button>
                <p class="description">Insert description</p>
            </div>


            <div class="delivery">
                <span class="subtitle">Delivery/ Collection</span>
                <button class="down-arrow">&#8964;</button>
                <p class="description">Insert description</p>
            </div>

            <div class="ig">
                <p>IG:</p>
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
  components:{
    'image-slider':ImageSlider,
    'reviews':Reviews
    /*'ratings': Ratings*/
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
}

.down-arrow {
    background: none;
    border: none;
    font-weight: bolder;
    cursor: pointer;
}

.subtitle {
    font-weight:bold;
}


.review{
    margin-top: 50px;
    margin-left: 50px;
}
</style>