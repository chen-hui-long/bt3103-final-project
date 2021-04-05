<template>
  <div class="card-carousel" @mouseover="stopTimer" @mouseleave="restartTimer">
    <div class="thumbnails">
      <div
        v-for="(image, index) in images"
        :key="image.id"
        :class="['thumbnail-image', activeImage == index ? 'active' : '']"
        @click="activateImage(index)"
      >
        <img :src="image.thumb" />
      </div>
    </div>

    <div class="card-img">
      <img :src="currentImage" alt="" />
      <div class="actions">
        <button @click="prevImage" class="prev">&#8249;</button>
        <button @click="nextImage" class="next">&#8250;</button>
      </div>
    </div>

    <div class="fav">
      <button id="fav" @click="fav">♡</button>
    </div>
  </div>
</template>

<script>
import database from "../firebase.js";
import firebase from "@firebase/app";
require("firebase/auth");
export default {
  name: "Carousel",
  props: {
    images: {},
    curr_product_id: [],
  },
  data() {
    return {
      curr_user_id: "",
      docID: "",
      /*images: [
          {id:'1',
          thumb:"https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg"
          },
          {id:'2',
          thumb:"https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg"
          },
          {id:'3',
          thumb:"https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg"
          },
      ],*/
      //Index of the starting image
      startingImage: 0,
      //Index of the active image
      activeImage: 0,
      //Hold the timeout, so we can clear it when it is needed
      autoSlideTimeout: null,
      //If the timer is stopped e.g. when hovering over the carousel
      stopSlider: false,
      //Hold the time left until changing to the next image
      timeLeft: 0,
      //Hold the interval so we can clear it when needed
      timerInterval: null,
    };
  },
  computed: {
    // currentImage gets called whenever activeImage changes
    // and is the reason why we don't have to worry about the
    // big image getting updated
    currentImage() {
      return this.images[this.activeImage].thumb;
    },
  },
  methods: {
    // Go forward on the images array
    // or go at the first image if you can't go forward
    nextImage() {
      var active = this.activeImage + 1;
      if (active >= this.images.length) {
        active = 0;
      }
      this.activateImage(active);
    },
    // Go backwards on the images array
    // or go at the last image
    prevImage() {
      var active = this.activeImage - 1;
      if (active < 0) {
        active = this.images.length - 1;
      }
      this.activateImage(active);
    },
    activateImage(imageIndex) {
      this.activeImage = imageIndex;
    },
    //Wait until 'interval' and go to the next image;
    startTimer(interval) {
      if (interval && interval > 0 && !this.stopSlider) {
        var self = this;
        clearTimeout(this.autoSlideTimeout);
        this.autoSlideTimeout = setTimeout(function () {
          self.nextImage();
          self.startTimer(self.autoSlideInterval);
        }, interval);
      }
    },

    //Stop the timer when hovering over the carousel
    stopTimer() {
      clearTimeout(this.autoSlideTimeout);
      this.stopSlider = true;
      clearInterval(this.timerInterval);
    },

    //Restart the timer(with 'timeLeft') when leaving from the carousel
    restartTimer() {
      this.stopSlider = false;
      clearInterval(this.timerInterval);
      this.startTimer(this.timeLeft);
    },

    fav() {
      //if current user is guest, direct to login page
      if (!firebase.auth().currentUser) {
        this.$router.push({ path: "/login" });
      } else {
        //if user fav the shop, remove from fav
        database
          .collection("Users")
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then((snapshot) => {
            //if already fav, remove. else add
            if (snapshot.data().favourite.includes(this.curr_product_id)) {
              //update the current user favourite list
              database
                .collection("Users")
                .doc(firebase.auth().currentUser.uid)
                .update({
                  favourite: firebase.firestore.FieldValue.arrayRemove(
                    this.curr_product_id
                  ),
                  total_favourite: firebase.firestore.FieldValue.increment(-1),
                });
              //update the product's number of favourites
              database
                .collection("bakeriesNew")
                .doc(this.curr_product_id)
                .update({
                  total_favourites_by_users: firebase.firestore.FieldValue.increment(-1),
                  favourite_users: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid),
                });
            } else {
              database
                .collection("Users")
                .doc(firebase.auth().currentUser.uid)
                .update({
                  favourite: firebase.firestore.FieldValue.arrayUnion(
                    this.curr_product_id
                  ),
                  total_favourite: firebase.firestore.FieldValue.increment(1),
                });
              //update the product number of favourites
              database
                .collection("bakeriesNew")
                .doc(this.curr_product_id)
                .update({
                  total_favourites_by_users: firebase.firestore.FieldValue.increment(1),
                  favourite_users: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid),
                });
            }
          });
      }
    },
    fetchItems: function () {
      console.log("fettching item..");
      console.log(this.docID);
      database
        .collection("bakeries")
        .doc(this.docID)
        .get()
        .then((snapshot) => {
          this.bakery.push(snapshot.data());
          /*this.images[0].thumb.push(snapshot.data().ImageURL)*/
        });
    },

    created() {
      //Check if startingImage prop was given and if the index is inside the images array bounds
      if (
        this.startingImage &&
        this.startingImage >= 0 &&
        this.startingImage < this.images.length
      ) {
        this.activeImage = this.startingImage;
      }
      this.fetchItems();
    },
  },
};
</script>


<style scoped>
.card-carousel {
  /*user-select: none;*/
  position: relative;
  display: inline-block;
}

.thumbnails {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  float: left;
}

.thumbnail-image {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-bottom: 20px;
}

.thumbnail-image > img {
  width: 80px;
  height: 80px;
  transition: all 250ms;
  opacity: 0.5;
  border-radius: 15px;
}

.thumbnail-image:hover > img,
.thumbnail-image.active > img {
  opacity: 1;
  border: 3px solid black;
  border-radius: 15px;
}

.card-img {
  position: absolute;
  left: 120px;
  justify-content: center;
}

.card-img > img {
  width: 450px;
  height: 450px;
  border-radius: 15px;
  margin-left: 75px;
}

.actions {
  font-size: 1.5em;
  height: 40px;
  position: absolute;
  top: 50%;
  margin-top: -20px;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #585858;
}

.actions > button {
  cursor: pointer;
  transition: all 250ms;
  font-size: 30px;
  width: 50px;
  border-radius: 50%;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.actions > button:hover {
  background-color: black;
  color: white;
}

.fav {
  position: absolute;
  margin-left: 670px;
  font-size: 28px;
  font-family: system-ui;
  font-weight: 500px;
}
.fav > button {
  cursor: pointer;
  transition: all 250ms;
  width: 50px;
  border-radius: 50%;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
}
</style>
