<template>
  <body>
    <div class="breadcrumb-wrap">
      <ul class="breadcrumb">
        <li>
          <a><router-link to="/" exact>Home</router-link></a>
        </li>
        <li> {{this.bakery[0].shop_name}}</li>
      </ul>
    </div>

    <div class="product-content">
      
      <div class="left-wrapper">
        <div class="product-content-left">
          <image-slider
            v-bind:images="images"
            :curr_product_id="docID"
            :curr_user="curr_user"
          ></image-slider>
        </div>

        <div class="review">
          <reviews></reviews>
        </div>
      </div>

      <div class="right-wrapper">
        <div class="product-content-right">
          <div class="title">
            <h1>{{ this.shop_name }}</h1>
          </div>
          <div class="description-box">
            <p class="description">{{ this.short_desc }}</p>
          </div>

          <div class="product-description">
            <div class="menu">
              <details>
                <summary>Menu</summary>
                <span
                  class="description-box"
                  v-for="(bake, index) in bakery[0].type"
                  :key="index"
                >
                  <span class="description1" v-if="index != 0">, </span>
                  {{ bake }}
                </span>
              </details>
            </div>

            <div class="highlights">
              <details>
                <summary>Highlights</summary>
                <div v-show="this.bakery[0].dietary != ''">
                  <div
                    class="description-box"
                    v-for="(diet, index) in bakery[0].dietary"
                    :key="index"
                  >
                    <ul class="description1">
                      <li>{{ diet }}</li>
                    </ul>
                  </div>
                </div>

                <div v-show="this.bakery[0].dietary == ''">
                  <div class="description-box">
                    <ul>
                      <li>No special dietary requirements</li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>

            <div class="delivery">
              <details>
                <summary>Delivery / Collection</summary>
                <div style="float: left" class="description-box">
                  <p class="description1">
                    {{ this.bakery[0].order_details }}
                  </p>
                </div>
              </details>
            </div>

            <div class="social-wrapper">
              <div v-show="this.instagram != ''">
                <div class="ig">
                  <span style="font-weight: bold">IG:</span>
                  <a
                    :href="'https://www.instagram.com/' + this.instagram"
                    class="description-box"
                    >@{{ this.instagram }}
                  </a>
                </div>
              </div>

              <div v-show="this.bakery[0].facebook != ''">
                <div class="fb">
                  <span style="font-weight: bold">FB:</span>
                  <a :href="this.bakery[0].facebook" class="description-box"
                    >{{ this.bakery[0].facebook }}
                  </a>
                </div>
              </div>

              <div v-show="this.bakery[0].official_website != ''">
                <div class="website">
                  <span style="font-weight: bold">Website:</span>
                  <a
                    :href="this.bakery[0].official_website"
                    class="description-box"
                    >{{ this.bakery[0].official_website }}
                  </a>
                </div>
              </div>

              <div v-show="this.bakery[0].business_email != ''">
                <div class="email">
                  <span style="font-weight: bold">Email:</span>
                  <a class="description-box"
                    >{{ this.bakery[0].business_email }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import ImageSlider from "./ImageSlider.vue";
import Reviews from "./Reviews";
import database from "../firebase.js";
import firebase from "@firebase/app";
require("firebase/auth");
export default {
  data() {
    return {
      docID: "",
      bakery: [],
      isActive1: false,
      isActive2: false,
      isActive3: false,
      images: [],
      shop_name: "",
      short_desc: "",
      instagram: "",
      curr_user: "",
    };
  },
  components: {
    "image-slider": ImageSlider,
    reviews: Reviews,
  },
  methods: {
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

    fetchItems: function () {
      database
        .collection("bakeriesNew")
        .doc(this.docID)
        .get()
        .then((snapshot) => {
          this.bakery.push(snapshot.data());
          this.images.push({ id: "1", thumb: snapshot.data().images[0] });
          this.images.push({ id: "2", thumb: snapshot.data().images[1] });
          this.images.push({ id: "3", thumb: snapshot.data().images[2] });
          this.images.push({ id: "4", thumb: snapshot.data().images[3] });
          this.shop_name = snapshot.data().shop_name;
          this.short_desc = snapshot.data().short_desc;
          this.instagram = snapshot.data().instagram;
        });
      if (firebase.auth().currentUser) {
        this.curr_user = firebase.auth().currentUser.uid;
      }
    },
  },

  created() {
    this.docID = this.$route.query.id;
    this.fetchItems();
  },
};
</script>

<style scoped>
.breadcrumb-wrap {
  position: relative;
  padding-left: 60px;
}

ul.breadcrumb {
  padding: 8px 16px;
  list-style: none;
  font-size: 18px;
}

ul.breadcrumb li {
  display: inline;
}

ul.breadcrumb li + li:before {
  padding: 8px;
  color: #626262;
  content: "/\00a0";
}

ul.breadcrumb li a {
  color: #626262;
  text-decoration: none;
}

.product-content {
  width: 100%;
  display: flex;
  margin-top: 50px;
  overflow-x: auto;
}



.left-wrapper {
  width: 60%; 
  margin-left: 50px;
  /*margin-right: 80px;*/
}
.right-wrapper {
  margin-right: 80px;
  margin-top: -1.5em;
  /*position: relative;*/
  position:absolute;
  right: 0;
  max-width: 35%;
  min-width: 35%;
  /*flex: 0 0 50%*/
  /*min-width: 40%;*/
}

div.disabled {
  overflow-x: scroll;
}

.menu {
  margin-bottom: 40px;
}

.highlights {
  margin-bottom: 40px;
}

.delivery {
 margin-bottom: 50px;
}

.social-wrapper {
  display: inline-block;
  max-width: 100%;
  word-wrap: break-word;
}

.ig {
  /*display: flex;*/
  font-size: 18px;
}

.ig a {
  color: #a19090;
  margin-left: 10px;
  word-break: break-all;
}

.fb {
  /*display: flex;*/
  font-size: 18px;
  margin-top: 18px;
}

.fb a {
  color: #a19090;
  margin-left: 10px;
  word-break: break-all;
}

.website {
  /*display: flex;*/
  font-size: 18px;
  margin-top: 18px;
}

.website a {
  color: #a19090;
  margin-left: 10px;
  word-break: break-all;
}

.email {
  font-size: 18px;
  margin-top: 18px;
}

.email a {
  color: #a19090;
  margin-left: 10px;
  text-decoration: underline;
  word-break: break-all;
}

.title {
  color: #a19090;
  letter-spacing: 1px;
  line-height: 20px;
  word-wrap: break-word;
}
.subtitle {
  font-weight: bold;
  font-size: 18px;
}

.description {
  margin-top: 20px;
  margin-bottom: 40px;
  width: 95%;
}

.description-box {
  font-size: 18px;
}

.description1 {
  margin-top: 10px;
  margin-bottom: 40px;
}

.review {
  margin-top: 150px;
}

details {
  margin-bottom: 1rem;
  /*padding: 0.25rem;*/
  border-radius: 0.25rem;
}
summary {
  list-style-type: none;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  outline: none;
  color: darkslategray;
}
summary::after {
  content: "›";
  transform: rotate(-270deg);
  padding: 0.5rem;
  position: absolute;
  right: 0.25rem;
  top: -0.7rem;
  color: rgb(0, 0, 0);
  font-size: 1.5em;
}

details[open] summary::after {
  content: "‹";
  font-size: 1.5em;
}


h1 {
  line-height: 100%;
}
</style>