<template>
  <div class="login-page">
  <p id="message"><router-link to="/" exact>Home</router-link><b> / Sell</b></p>
    <div class="form">
      <form class="register-form">
        Email:
        <input type="text" v-model="email" placeholder="Email" />
        Password:
        <input type="text" v-model="password" placeholder="Password" />
        Shop Name:
        <input type="password" v-model="shop_name" placeholder="Shop Name" />
        Short description of business and speciaties:
        <input
          type="password"
          v-model="short_desc"
          placeholder="Short description"
        />
        Product types:
        <Multiselect></Multiselect>
        <br>
        Dietary types & options:
        <br />
        <label id="checkbox-block">Halal<input type="checkbox" id="checkbox-dietary" /></label>
        <label id="checkbox-block">Keto<input type="checkbox"  id="checkbox-dietary"/></label>
        <label id="checkbox-block">Gluten-Free<input type="checkbox"  id="checkbox-dietary"/></label>
        <label id="checkbox-block">Vegan<input type="checkbox"  id="checkbox-dietary"/></label>
        <br> 
        Deal Options:
        <br>
        <label id="checkbox-block">Delivery<input type="checkbox" id="checkbox-delivery" /></label>
        <label id="checkbox-block">Self Pick-Up<input type="checkbox" id="checkbox-delivery" /></label>
        <br> 
        Delivery/Self Pick-Up Details: <br>
        (fees, location, etc)
        <input type="text" v-model="order_details" placeholder="Delivery: Self Pick-Up:" />
        <br>
        Location:
        <br>
        <select id="location" >
            <option value="Central" selected>Central</option>
            <option value="East">East</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="West">West</option>
        </select>
        <br>
        <br>
        Business email:
        <input type="text" v-model="email" placeholder="Business Email" />
        Official Website: 
        <input type="text" v-model="email" placeholder="Official Website" />   
        Instagram:
        <input type="text" v-model="email" placeholder="handlename" />     
        
        
        <button v-on:click.prevent="register">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from "./MultiSelect.vue";
import db from "../firebase.js";
import firebase from "@firebase/app";
require("firebase/auth");
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      email: "",
      password: "",
      shop_name: "",
      short_desc: "",
      value: [],
    };
  },

  methods: {
    register: function () {
      console.log("register start");
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (cred) => {
            console.log(cred);
            db.collection("Users").doc(cred.user.uid).set({
              email: this.email,
              firstname: this.firstname,
            });
          },
          (err) => {
            alert(err.message);
          }
        );
      console.log("end");
    },
  },
};
</script>

<style scoped>
.login-page {
  width: 80%;
  padding: 8% 0 0;
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
  width: 100%;
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
</style>