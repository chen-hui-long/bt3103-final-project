<template>
  <div>
    <div class="navbar">
      <NavBar></NavBar>
    </div>
    <div class="login-page">
      <header>Edit your listing</header>
      <div class="form">
        <form class="register-form">
          Shop name:
          <input type="text" v-model="shop_name" placeholder="Shop name" />
          Short description of business and specialties:
          <input
            type="text"
            v-model="short_desc"
            placeholder="Short description"
          />
          Product types:
          <Multiselect v-on:input="clickMulti($event)" v-bind:value = "type"></Multiselect>
          <br />
          Dietary types & options:
          <br />
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
          <br />
          Deal Options:
          <br />
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
          <br />
          Location:
          <br />
          <select id="location" v-model="location">
            <option value="Central" selected>Central</option>
            <option value="East">East</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="West">West</option>
          </select>
          <br />
          <br />
          Business email:
          <input
            type="text"
            v-model="business_email"
            placeholder="Business Email"
          />
          Official Website:
          <input
            type="text"
            v-model="official_website"
            placeholder="Official Website"
          />
          Instagram:
          <input type="text" v-model="instagram" placeholder="@handlename" />
          Facebook:
          <input type="text" v-model="facebook" placeholder="Facebook Page" />
          Upload Pictures of your product:
          <div id="image-upload">
            <div id="image-upload-div">
              <input type="file" @change="onFileChange1" accept="image/*" />
              <img v-if="this.imageData1" :src="imageData1" />
              <img v-else :src="this.imageData1" />
              <div class = "delete-image-div">
              <button class= "delete-image" v-on:click.prevent = "delete_image1">Delete</button>
              </div>
            </div>
            <div id="image-upload-div">
              <input type="file" @change="onFileChange2" accept="image/*" />
              <img v-if="this.imageData2" :src="imageData2" />
              <img v-else :src="this.imageData2" />
              <div class = "delete-image-div">
              <button class= "delete-image" v-on:click.prevent = "delete_image2">Delete</button>
              </div>
            </div>
            <div id="image-upload-div">
              <input type="file" @change="onFileChange3" accept="image/*" />
              <img v-if="this.imageData3" :src="imageData3" />
              <img v-else :src="this.imageData3" />
              <div class = "delete-image-div">
              <button class= "delete-image" v-on:click.prevent = "delete_image3">Delete</button>
              </div>
            </div>
            <div id="image-upload-div">
              <input type="file" @change="onFileChange4" accept="image/*" />
              <img v-if="this.imageData4" :src="imageData4" />
              <img v-else :src="this.imageData4" />
              <div class = "delete-image-div">
              <button class= "delete-image" v-on:click.prevent = "delete_image4">Delete</button>
              </div>
            </div>
          </div>
          <br />
          Order Details:
          <input
            type="text"
            v-model="order_details"
            placeholder="Give a short description of order, eg. min order etc"
          />
          <br />
          <div id = "changes">
            <button id = "deletebtn" v-on:click = "delete_action">Delete Listing</button>
            <button id = "cancelbtn" v-on:click = "cancel_action">Cancel</button>
            <button id = "savebtn" v-on:click = "save">Save changes</button>
            </div>
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
      short_desc: "",
      type: [],
      dietary: [],
      deal_options: [],
      location: "",
      business_email: "",
      official_website: "",
      facebook: "",
      instagram: "",
      imageData1: "",
      imageData2: "",
      imageData3: "",
      imageData4: "",
      order_details: "",
      userID: firebase.auth().currentUser.uid,
      no_image: "https://www.asiaoceania.org/aogs2021/img/no_uploaded.png",
    };
  },

  methods: {
    fetchItems: function () {
      db.collection("bakeriesNew")
        .doc(this.userID)
        .get()
        .then((doc) => {
          this.shop_name =  doc.data().shop_name;
          this.short_desc = doc.data().short_desc;
          this.type= doc.data().type;
          this.dietary = doc.data().dietary;
          this.location = doc.data().location;
          this.deal_options = doc.data().deal_options;
          this.business_email = doc.data().business_email;
          this.official_website = doc.data().official_website;
          this.facebook = doc.data().facebook;
          this.instagram = doc.data().instagram;
          this.order_details = doc.data().order_details;
          this.imageData1 = doc.data().images[0];
          this.imageData2 = doc.data().images[1];
          this.imageData3 = doc.data().images[2];
          this.imageData4 = doc.data().images[3];
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

    clickMulti: function (event) {
      this.type = [];
      for (var i = 0; i < event.length; i++) {
        this.type.push(event[i].type);
        }
    }, 
    cancel_action:function() {
        this.$router.push({path: '/sellerprofile'})
    },
    
    save:function() {
        db.collection("bakeriesNew").doc(this.userID).update({
            shop_name: this.shop_name, 
            short_desc:this.short_desc, 
            type: this.type, 
            dietary: this.dietary, 
            deal_options: this.deal_options, 
            location: this.location, 
            business_email: this.business_email,
            official_website: this.official_website,
            facebook: this.facebook,
            instagram: this.instagram,
            images: [this.imageData1, this.imageData2, this.imageData3, this.imageData4],
            order_details: this.order_details, 
      })
      this.$router.push({path: '/sellerprofile'})
    }, 

    delete_action:function() {
        db.collection("bakeriesNew").doc(this.userID).delete()
        db.collection("Users").doc(this.userID).update({
            seller:false
        })
        this.$router.push({path: '/profile'})
    }, 

    delete_image1:function() {
        this.imageData1 = this.no_image;
    }, 

    delete_image2:function() {
        this.imageData2 = this.no_image;
    }, 
    delete_image3:function() {
        this.imageData3 = this.no_image;
    },
    delete_image4:function() {
        this.imageData4 = this.no_image;
    }            
  },

  created: function () {
    this.fetchItems();
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
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
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

.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 33%;
  border: 0;
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
  background: #43a047;
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

#image-upload {
  display: flex;
  justify-content: space-around;
}

#image-upload-div {
  width: 25%;
  align-items: center;
}

img {
  width: 200px;
  height: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.navbar {
  text-align: center;
}

#changes {
    display: flex;
    justify-content: space-around;
}

#deletebtn{
    background: #cc3723;
}

#cancelbtn{
    background: #617375;
}

#savebtn{
    background: #43a047;
}

.delete-image-div {
  display: flex;
  justify-content: space-around;
}

button.delete-image {
    margin-top:10px;
    padding: 5px;
    background:#cc3723
}
</style>