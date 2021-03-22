<template>
    <body>
        <div class="breadcrumb-wrap">
            <ul class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Vegan</a></li>
                <li class="breadcrumb-item active">Product List</li>
            </ul>
        </div>

        <div class="product-content">

            <div class="product-content-left">
                
                <!--div class="product-slider side-slider">
                    <ul style="list-style-type:none;">
                    <li><button><img src="@/assets/search.png"></button></li>
                    <li><button<img src="@/assets/search.png"></button></li>
                    <li><img src="@/assets/search.png"></li>
                    </ul>
                </div-->

                  <div class="product-slider">
                    <transition-group name="fade" tag="div">
                        <div v-for="i in [currentIndex]" :key="i">
                        <img :src="currentImg" />
                        </div>
                    </transition-group>
                    <a class="prev" @click="prev" href="#">&#10094; Previous</a>
                    <a class="next" @click="next" href="#">&#10095; Next</a>
                </div>

                <div class="product-slider-side">
                    <div v-for="(image,index) in images"
                    :key="image.id"
                    :class="['thumbnail-image', (activeImage == index) ? 'active' : '']"
                    @click="activateImage(index)">
                    <img :src="image.thumb">
                </div>
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
</div>
</body>
</template>

<script>
export default {
    data() {
    return {
      images: [
          {id:'1',
          thumb:"https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg"
          },
          {id:'2',
          thumb:"https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg"
          },
          {id:'3',
          thumb:"https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg"
          },
        /*"https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg",*/
      ],
      timer: null,
      currentIndex: 0
    };
  },

  methods: {
    next: function() {
      this.currentIndex += 1;
    },
    prev: function() {
      this.currentIndex -= 1;
    }
  },

  computed: {
    currentImg: function() {
      return this.images[Math.abs(this.currentIndex) % this.images.length].thumb;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  overflow: hidden;
  visibility: visible;
  position: absolute;
  width:100%;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  width:100%;
  opacity: 0;
}

img {
  width:40%;
  height: 400px;
}

.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0;
  text-decoration: none;
  user-select: none;
}

.next {
  left: 40%;
  color:black;
}

.prev {
  left: -10%;
  color:black;
}

.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.9);
}


.thumbnails {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
}

.thumbnail-image {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 2px;
}

.thumbnail-image > img {
    width: 100%;
    height: auto;
    transition: all 250ms;
}

.thumbnail-image:hover > img, 
.thumbnail-image.active > img {
    opacity: 0.6;
    box-shadow: 2px 2px 6px 1px rgba(0,0,0, 0.5);
}




.breadcrumb-wrap {
    position: relative;
    width: 100%;
}

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
}


.product-content {
    display:flex;
}


.product-content-left{
    position:relative;
    left: 20%;
    display:flex;
}

.product-content-right{
    position:relative;
    right: 20%;
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
</style>