<template>
    <body>
        <div class="breadcrumb-wrap">
        <ul class="breadcrumb">
            <li><a><router-link to="/" exact>Home</router-link></a></li>
            <!-- insert router for dietary type if there is 
            Show only when click at filter 
            then click will go back to the home page with the filtered dietayr
            Or is too hard shld we just scrape it away??? -->
            <li v-show= "this.bakery[0].Dietary != '-'"><a href="#">{{this.bakery[0].dietary}}</a></li> /
            <li>{{this.bakery[0].shop_name}}</li>


        </ul>
        </div>

        <div class="product-content">
            <div class="product-content-left">
            <image-slider></image-slider>
            </div>

            
            <div class="product-content-right">
            
            <div class="title"><h1>{{this.bakery[0].shop_name}}</h1></div>
            <div style="width:430px;" class="description-box"><p class="description">{{this.bakery[0].short_desc}}</p></div>

            <div class="product-description">
            
            <div class="menu">
                <span class="subtitle">Menu</span>
                <div v-if='isActive1'>
                <button class="arrow" v-bind:class="{active:isActive1}" @click="toggle1()"><font-awesome-icon icon="angle-up" /></button>
                <br>
                <div class="wrapper">
                <div style="float:left;" class="description-box" v-for="(bake, index) in bakery[0].type" :key="index">
                <p class="description1"><div>{{bake}}
                <span v-if="index != Object.keys(bakery[0].type).length -1">,</span></div>
                </div>
                </div>
                </div>

                <div v-else>
                <button class="arrow" v-bind:class="{active:isActive1}" @click="toggle1()"><font-awesome-icon icon="angle-down" /></button>
                </div>
            </div>

            <div class="highlights">
                <span class="subtitle">Highlights</span>
                <div v-if='isActive2'>
                <button class="arrow" v-bind:class="{active:isActive2}" @click="toggle2()"><font-awesome-icon icon="angle-up" /></button>
                <br><div class="description-box"><p class="description">{{this.bakery[0].dietary}}</p></div> <!-- insert for-loop to display diff dietary type-->
                </div>
                <div v-else>
                <button class="arrow" v-bind:class="{active:isActive2}" @click="toggle2()"><font-awesome-icon icon="angle-down" /></button>
                </div>
            </div>


            <div class="delivery">
                <span class="subtitle">Delivery/ Collection</span>
                <div v-if='isActive3'>
                <button class="arrow" v-bind:class="{active:isActive3}" @click="toggle3()"><font-awesome-icon icon="angle-up" /></button>
                <br>
                <div class="description-box"><p class="description">{{this.bakery[0].order_details}}</p></div>
                </div>
                <div v-else>
                <button class="arrow" v-bind:class="{active:isActive3}" @click="toggle3()"><font-awesome-icon icon="angle-down" /></button>
                </div>
            </div>

            <div class="ig">
                <p style="font-weight:bold;">IG:</p>
                <a :href= "'https://www.instagram.com/' + this.bakery[0].instagram" class="description">@{{this.bakery[0].instagram}}</a>
            </div>
    
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
import database from "../firebase.js"
/*import Ratings from './Ratings.vue'*/
export default {
    data() {
        return {
            docID:"", 
            bakery:[], 
            isActive1: false,
            isActive2: false,
            isActive3: false, 
        }
    },
  components:{
    'image-slider':ImageSlider,
    'reviews':Reviews
    /*'ratings': Ratings*/
  },
  methods:{
      toggle1() {
        if (!this.isActive1) {
            this.isActive1 = true;
        } else {
            this.isActive1 = false;
        }
    },
          toggle2() {
        if (!this.isActive2) {
            this.isActive2 = true;
        } else {
            this.isActive2 = false;
        }
    },
          toggle3() {
        if (!this.isActive3) {
            this.isActive3 = true;
        } else {
            this.isActive3 = false;
        }
    },
    
    fetchItems:function() {
          database.collection('bakeriesNew').doc(this.docID).get().then((snapshot) => {
              this.bakery.push(snapshot.data())
          })
      }
    
  }, 


  created() {
      this.docID = this.$route.query.id
      this.fetchItems();
  }
};
</script>

<style scoped>


.breadcrumb-wrap {
    position: relative;
    padding-left:60px;
}

ul.breadcrumb {
  padding: 8px 16px;
  list-style: none;
  font-size: 18px;
}

ul.breadcrumb li {display: inline;}

ul.breadcrumb li+li:before {
  padding: 8px;
  color: #626262;
  content: "/\00a0";
}

ul.breadcrumb li a {
    color: #626262;
    text-decoration: none;
}

.product-content {
    display:flex;
    margin-top: 50px;
}

.product-content-left{
    flex: 0 0 60%;
    margin-left: 50px;;
    display:flex;
}

.product-content-right{
    flex: 0 0 40%;
    display:block;    
}

.menu, .highlights, .delivery {
    display:flex;
    width: 430px;
}

.ig {
    display:flex;
    font-size: 18px;
}

.ig a{
    color:#a19090;
    margin-top: 15px;
    margin-left: 10px;
}


.arrow {
    background: none;
    border: none;
    font-weight: bolder;
    cursor: pointer;
    position: absolute;
    /*display:inline-flex;*/
    font-size: 1.25em;
}

.title {
    color:#a19090;
    letter-spacing: 1px;
}
.subtitle {
    font-weight:bold;
    font-size: 18px;
    padding-bottom: 40px;
}

.description{
    margin-bottom:30px;
}

.description-box{
    /*position: absolute;*/
    left:1px;
}

.wrapper{
    padding-bottom:50px;
    color:blue;
}

.review{
    margin-top: 150px;
    margin-left: 50px;
}
</style>