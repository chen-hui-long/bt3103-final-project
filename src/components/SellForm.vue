<template>
  <div>
    <div class="navbar">
      <NavBar></NavBar>
    </div>
    <div class="login-page">
      <header>Complete the form and start selling today!</header>
      <div class="form">
        <form class="register-form">
          <table>
            <tr>
              <td class="heading"><b>Shop Name*:</b></td>
              <td>
                <input
                  type="text"
                  :style="nameClicked ? { 'border-color': 'black' } : null"
                  v-model="shop_name"
                  placeholder="Shop Name"
                  v-on:click="toggleIsClicked1"
                  maxlength="50"
                />
              </td>
            </tr>
            <tr>
              <td class="heading">
                <b>Short description of business and specialties*:</b>
              </td>
              <td>
                <input
                  type="text"
                  :style="descClicked ? { 'border-color': 'black' } : null"
                  v-model="short_desc"
                  placeholder="Short description"
                  v-on:click="toggleIsClicked2"
                />
              </td>
            </tr>
            <tr>
              <td class="heading"><b>Product types*:</b></td>
              <td>
                <Multiselect v-on:input="clickMulti($event)"></Multiselect>
              </td>
            </tr>
            <tr>
              <td class="heading"><b>Dietary types & options:</b></td>
              <td>
                <label id="checkbox-block"
                  >Halal<input
                    type="checkbox"
                    id="checkbox-dietary"
                    value="Halal"
                    v-model="dietary"
                /></label>
                <label id="checkbox-block"
                  >Keto<input
                    type="checkbox"
                    id="checkbox-dietary"
                    value="Keto"
                    v-model="dietary"
                /></label>
                <label id="checkbox-block"
                  >Gluten-Free<input
                    type="checkbox"
                    id="checkbox-dietary"
                    value="Gluten-Free"
                    v-model="dietary"
                /></label>
                <label id="checkbox-block"
                  >Vegan<input
                    type="checkbox"
                    id="checkbox-dietary"
                    value="Vegan"
                    v-model="dietary"
                /></label>
              </td>
            </tr>
            <tr>
              <td class="heading"><b>Deal Options*:</b></td>
              <td>
                <label id="checkbox-block"
                  >Delivery<input
                    type="checkbox"
                    id="checkbox-delivery"
                    value="Delivery"
                    v-model="deal_options"
                /></label>
                <label id="checkbox-block"
                  >Self Pick-Up<input
                    type="checkbox"
                    id="checkbox-delivery"
                    value="Self Pick-Up"
                    v-model="deal_options"
                /></label>
              </td>
            </tr>
            <tr>
              <td class="heading">
                <b>Delivery/Self Pick-Up Details*:</b>
                <br />
                (fees, locations, etc.)
              </td>
              <td>
                <input
                  type="text"
                  :style="delClicked ? { 'border-color': 'black' } : null"
                  v-model="order_details"
                  :placeholder="'Delivery: <insert details> \n and/or Self Pick-Up: <insert details>'"
                  v-on:click="toggleIsClicked3"
                />
              </td>
            </tr>
            <tr>
              <td class="heading"><b>Location*:</b></td>
              <td>
                <label id="checkbox-block"
                  >Central<input
                    type="checkbox"
                    id="checkbox-location"
                    value="Central"
                    v-model="location"
                /></label>
                <label id="checkbox-block"
                  >East<input
                    type="checkbox"
                    id="checkbox-location"
                    value="East"
                    v-model="location"
                /></label>
                <label id="checkbox-block"
                  >North<input
                    type="checkbox"
                    id="checkbox-location"
                    value="North"
                    v-model="location"
                /></label>
                <label id="checkbox-block"
                  >South<input
                    type="checkbox"
                    id="checkbox-location"
                    value="South"
                    v-model="location"
                /></label>
                <label id="checkbox-block"
                  >West<input
                    type="checkbox"
                    id="checkbox-location"
                    value="West"
                    v-model="location"
                /></label>
              </td>
            </tr>
            <tr>
              <td class="heading"><b>Business email:</b></td>
              <td>
                <input
                  type="text"
                  :style="emailClicked ? { 'border-color': 'black' } : null"
                  v-on:click="toggleIsClicked4"
                  v-model="business_email"
                  placeholder="Business Email"
                />
              </td>
            </tr>
            <tr>
              <td class="heading"><b>Official Website: </b></td>
              <td>
                <input
                  type="text"
                  :style="websiteClicked ? { 'border-color': 'black' } : null"
                  v-on:click="toggleIsClicked5"
                  v-model="official_website"
                  placeholder="Official Website"
                />
              </td>
            </tr>
            <tr>
              <td class="heading"><b>Instagram:</b></td>
              <td>
                <input
                  type="text"
                  :style="igClicked ? { 'border-color': 'black' } : null"
                  v-on:click="toggleIsClicked6"
                  v-model="instagram"
                  placeholder="Handlename"
                />
              </td>
            </tr>
            <tr>
              <td class="heading"><b>Facebook:</b></td>
              <td>
                <input
                  type="text"
                  :style="fbClicked ? { 'border-color': 'black' } : null"
                  v-on:click="toggleIsClicked7"
                  v-model="facebook"
                  placeholder="Facebook Page"
                />
              </td>
            </tr>
          </table>
          <div id="photos">
          <b>Upload Pictures of your product:</b>
          <div id="image-upload">
            <div id="image-upload-div">
              <input type="file" @change="onFileChange1" accept="image/*" />
              <img v-if="this.imageData1" :src="imageData1" />
              <img v-else :src="this.logo_image" />
            </div>
            <div id="image-upload-div">
              <input type="file" @change="onFileChange2" accept="image/*" />
              <img v-if="this.imageData2" :src="imageData2" />
              <img v-else :src="this.product_image" />
            </div>
            <div id="image-upload-div">
              <input type="file" @change="onFileChange3" accept="image/*" />
              <img v-if="this.imageData3" :src="imageData3" />
              <img v-else :src="this.product_image" />
            </div>
            <div id="image-upload-div">
              <input type="file" @change="onFileChange4" accept="image/*" />
              <img v-if="this.imageData4" :src="imageData4" />
              <img v-else :src="this.product_image" />
            </div>
          </div>
          </div>
          <br />
          <button v-on:click.prevent="register">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "./MultiSelect.vue";
import db from "../firebase.js";
import firebase from "@firebase/app";
require("firebase/auth");
import NavBar from "./ProfileNavBar";
export default {
  components: {
    Multiselect,
    NavBar,
  },
  data() {
    return {
      shop_name: "",
      nameClicked: true,
      descClicked: false,
      delClicked: false,
      emailClicked: false,
      websiteClicked: false,
      igClicked: false,
      fbClicked: false,
      short_desc: "",
      type: [],
      dietary: [],
      deal_options: [],
      location: [],
      business_email: "",
      official_website: "",
      facebook: "",
      instagram: "",
      imageData1:
        "https://scontent-xsp1-2.xx.fbcdn.net/v/t1.6435-9/172264055_10216094457589278_91680100162152886_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=730e14&_nc_ohc=EJ1lo2oM5TYAX8cBhCD&_nc_ht=scontent-xsp1-2.xx&oh=d5851c99698747a40aca253d2f874a24&oe=609BB005",
      imageData2:
        "https://scontent-xsp1-2.xx.fbcdn.net/v/t1.6435-9/169937624_10216094457629279_3868980115832293243_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=730e14&_nc_ohc=-82cH4NY5NwAX-fgfxv&_nc_ht=scontent-xsp1-2.xx&oh=7bb08790a7c8d162dcef95c0fa0be55c&oe=609A5816",
      imageData3:
        "https://scontent-xsp1-2.xx.fbcdn.net/v/t1.6435-9/169937624_10216094457629279_3868980115832293243_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=730e14&_nc_ohc=-82cH4NY5NwAX-fgfxv&_nc_ht=scontent-xsp1-2.xx&oh=7bb08790a7c8d162dcef95c0fa0be55c&oe=609A5816",
      imageData4:
        "https://scontent-xsp1-2.xx.fbcdn.net/v/t1.6435-9/169937624_10216094457629279_3868980115832293243_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=730e14&_nc_ohc=-82cH4NY5NwAX-fgfxv&_nc_ht=scontent-xsp1-2.xx&oh=7bb08790a7c8d162dcef95c0fa0be55c&oe=609A5816",
      order_details: "",
      logo_image:
        "https://scontent-xsp1-2.xx.fbcdn.net/v/t1.6435-9/172264055_10216094457589278_91680100162152886_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=730e14&_nc_ohc=EJ1lo2oM5TYAX_2Z09l&_nc_ht=scontent-xsp1-2.xx&oh=3526502c7e44efa2da66df74d91ccea1&oe=609BB005",
      product_image:
        "https://scontent-xsp1-2.xx.fbcdn.net/v/t1.6435-9/169937624_10216094457629279_3868980115832293243_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=730e14&_nc_ohc=-82cH4NY5NwAX8OqBJf&_nc_ht=scontent-xsp1-2.xx&oh=2be96dbe724629ccb9435661460a0cd9&oe=609A5816",
      userID: firebase.auth().currentUser.uid,
    };
  },

  methods: {
    register: function () {
      if (!this.checkAllFilled()) {
        this.$swal({
          icon: "error",
          text: "Error: Please fill up all the required details",
          confirmButtonColor: "#000000",
        });
      } else {
        this.updateToSeller();
        db.collection("bakeriesNew")
          .doc(this.userID)
          .set({
            shop_name: this.shop_name,
            short_desc: this.short_desc,
            type: this.type,
            dietary: this.dietary,
            deal_options: this.deal_options,
            location: this.location,
            business_email: this.business_email,
            official_website: this.official_website,
            facebook: this.facebook,
            instagram: this.instagram,
            images: [
              this.imageData1,
              this.imageData2,
              this.imageData3,
              this.imageData4,
            ],
            order_details: this.order_details,
            ratings: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            total_ratings_by_users: 0,
            total_favourites_by_users: 0,
            owner: this.userID,
            reviews: [],
            favourite_users: [],
            review_users: [],
          })
          .then(() => {
            this.$router.push({ path: "/sellerprofile" });
          });
      }
    },

    updateToSeller: function () {
      //function to update user to seller in firestore
      db.collection("Users").doc(this.userID).update({
        seller: true,
      });
    },
    onFileChange1(event) {
      const file = event.target.files.item(0);
      const reader = new FileReader();
      reader.addEventListener("load", this.imageLoaded1);
      reader.readAsDataURL(file);
    },
    imageLoaded1(event) {
      this.imageData1 = event.target.result;
    },

    onFileChange2(event) {
      const file = event.target.files.item(0);
      const reader = new FileReader();
      reader.addEventListener("load", this.imageLoaded2);
      reader.readAsDataURL(file);
    },

    imageLoaded2(event) {
      this.imageData2 = event.target.result;
    },

    onFileChange3(event) {
      const file = event.target.files.item(0);
      const reader = new FileReader();
      reader.addEventListener("load", this.imageLoaded3);
      reader.readAsDataURL(file);
    },

    imageLoaded3(event) {
      this.imageData3 = event.target.result;
    },

    onFileChange4(event) {
      const file = event.target.files.item(0);
      const reader = new FileReader();
      reader.addEventListener("load", this.imageLoaded4);
      reader.readAsDataURL(file);
    },

    imageLoaded4(event) {
      this.imageData4 = event.target.result;
    },

    toggleIsClicked1: function () {
      this.nameClicked = !this.nameClicked;
      this.descClicked = false;
      this.delClicked = false;
      this.emailClicked = false;
      this.websiteClicked = false;
      this.igClicked = false;
      this.fbClicked = false;
    },

    toggleIsClicked2: function () {
      (this.nameClicked = false), (this.descClicked = !this.descClicked);
      this.delClicked = false;
      this.emailClicked = false;
      this.websiteClicked = false;
      this.igClicked = false;
      this.fbClicked = false;
    },

    toggleIsClicked3: function () {
      (this.nameClicked = false),
        (this.descClicked = false),
        (this.delClicked = !this.delClicked);
      this.emailClicked = false;
      this.websiteClicked = false;
      this.igClicked = false;
      this.fbClicked = false;
    },

    toggleIsClicked4: function () {
      (this.nameClicked = false),
        (this.descClicked = false),
        (this.delClicked = false),
        (this.emailClicked = !this.emailClicked);
      this.websiteClicked = false;
      this.igClicked = false;
      this.fbClicked = false;
    },

    toggleIsClicked5: function () {
      (this.nameClicked = false),
        (this.descClicked = false),
        (this.delClicked = false),
        (this.emailClicked = false),
        (this.websiteClicked = !this.websiteClicked);
      this.igClicked = false;
      this.fbClicked = false;
    },

    toggleIsClicked6: function () {
      (this.nameClicked = false),
        (this.descClicked = false),
        (this.delClicked = false),
        (this.emailClicked = false),
        (this.websiteClicked = false),
        (this.igClicked = !this.igClicked);
      this.fbClicked = false;
    },

    toggleIsClicked7: function () {
      (this.nameClicked = false),
        (this.descClicked = false),
        (this.delClicked = false),
        (this.emailClicked = false),
        (this.websiteClicked = false),
        (this.igClicked = false),
        (this.fbClicked = !this.fbClicked);
    },

    clickMulti: function (event) {
      this.type = [];
      for (var i = 0; i < event.length; i++) {
        this.type.push(event[i].type);
      }
    },

    checkAllFilled: function () {
      if (
        this.shop_name == "" ||
        this.short_desc == "" ||
        this.type.length == 0 ||
        this.deal_options.length == 0 ||
        this.location.length == 0 || 
        this.order_details == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
  color: black;
  font-size: 40px;
  font-weight: bold;
  margin-block: 40px;
}

.login-page {
  width: 80%;
  padding: 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  margin: 0 auto 100px;
  padding: 45px;
  border: #bbbbbb solid 1px;
  border-radius: 10px;
  /*box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);*/
}

.form input {
  /*font-family: "Roboto", sans-serif;*/
  outline: 0;
  /*background: #f2f2f2;*/
  width: 100%;
  border: #bbbbbb solid 1px;
  margin: 0 0 20px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 10px;
}

table {
  border-spacing: 3em;
  margin-left: auto;
  margin-right: auto;
}

.heading {
  padding-right: 30px;
  padding-left: 0;
  width: 40%;
}

#checkbox-dietary {
  width: auto;
  margin-right: 15px;
  margin-left: 5px;
  width: 10px;
  height: 10px;
}

#checkbox-delivery {
  width: auto;
  margin-right: 15px;
  margin-left: 5px;
  width: 10px;
  height: 10px;
}

#checkbox-location {
  width: auto;
  margin-right: 15px;
  margin-left: 5px;
  width: 10px;
  height: 10px;
}

.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: black;
  width: 100%;
  border: 0;
  border-radius: 30px;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: black;
  transform: scale(1.05);
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4caf50;
  text-decoration: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}

#photos {
  max-width: 85%;
  margin-left: auto;
  margin-right: auto;
}


#image-upload {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

#image-upload-div {
  width: 25%;
  align-items: center;
  margin-right: 10px;
}

img {
  width: 200px;
  height: 200px;
  border: #bbbbbb solid 1px;
  border-radius: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.navbar {
  text-align: center;
}
</style>

<style>
.multiselect__option--highlight {
  background: #e3dddf !important;
  color: black;
  margin: 0 0 20px;
}

.multiselect__option--highlight:after {
  background: #bbbbbb !important;
}

.multiselect__tag {
  margin: 0 0 20px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #e3dddf;
  color: black;
}

.multiselect__tag-icon:after {
  color: rgba(60, 60, 60, 0.5) !important;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #f0f0f0 !important;
  color: black;
}
</style>