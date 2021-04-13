<template>
  <div class="login-page">
    <div class="form">
      <form class="register-form">
        <div id="text">
          <span id="text1"> Create your account </span><br />
          <span> Registration is easy. </span>
        </div>
        <br />
        <input
          type="text"
          :style="emailClicked ? { 'border-color': 'black' } : null"
          v-on:click="toggleIsClicked1"
          v-model="email"
          placeholder="Email*"
        />
        <input
          type="text"
          :style="nameClicked ? { 'border-color': 'black' } : null"
          v-on:click="toggleIsClicked2"
          v-model="name"
          placeholder="Name*"
        />

        <input
          type="password"
          :style="pwClicked ? { 'border-color': 'black' } : null"
          v-on:click="toggleIsClicked3"
          @input="checkPassword"
          v-model="password"
          autocomplete="off"
          placeholder="Password*"
        />
        <ul>
          <li v-bind:class="{ is_valid: contains_eight_characters }">
            Min. 8 Characters
          </li>
          <li v-bind:class="{ is_valid: contains_number }">
            At Least 1 Number
          </li>
          <li v-bind:class="{ is_valid: contains_uppercase }">
            At Least 1 Uppercase
          </li>
          <li v-bind:class="{ is_valid: contains_lowercase }">
            At Least 1 Lowercase
          </li>
        </ul>
        <div>
          I understand and agree to
          <a v-on:click="privacy">Terms and Conditions </a>
        </div>
        <br />
        <div
          class="checkmark_container"
          v-bind:class="{ show_checkmark: valid_password }"
        >
          <svg width="50%" height="50%" viewBox="0 0 140 100">
            <path
              class="checkmark"
              v-bind:class="{ checked: valid_password }"
              d="M10,50 l25,40 l95,-70"
            />
          </svg>
        </div>

        <button v-on:click.prevent="register">Register</button>
        <p class="message">
          Have An Account? <router-link to="/login" exact>Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../firebase.js";
import firebase from "@firebase/app";
//import func from 'vue-editor-bridge';
require("firebase/auth");
// ES6 Modules or TypeScript
// CommonJS

export default {
  components: {},

  data() {
    return {
      emailClicked: true,
      nameClicked: false,
      pwClicked: false,
      email: "",
      password: "",
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_lowercase: false,
      valid_password: false,
      name: "",
      default_image:
        "https://scontent-xsp1-1.xx.fbcdn.net/v/t1.6435-9/173171852_10216094461429374_3111105153938546504_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=730e14&_nc_ohc=kRraYh2KWv8AX_8jlAQ&_nc_ht=scontent-xsp1-1.xx&oh=03f25839a0d33eb04f94b491983464b3&oe=60993A1F",
    };
  },
  methods: {
    privacy() {
      this.$router.push({ path: "/terms-and-conditions" });
    },

    register: function () {
      if (!this.checkAllFilled()) {
        this.$swal({
          icon: "error",
          text: "Error: Please fill up all the required details",
          confirmButtonColor: "#000000",
        });
      } else {
        this.checkPassword();
        if (!this.valid_password) {
          this.$swal({
            icon: "error",
            text: "Error: Password does not meet the requirement",
            confirmButtonColor: "#000000",
          });
        } else {
          const curr_user = {
            email: this.email,
            name: this.name,
            favourite: [],
            reviews: [],
            total_review: 0,
            seller: false,
            total_favourite: 0,
            image: this.default_image,
          };
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(
              (cred) => {
                db.collection("Users")
                  .doc(cred.user.uid)
                  .set(Object.assign({}, curr_user));
                this.$swal({
                  icon: "success",
                  text: "Registration sucessful",
                  confirmButtonColor: "#000000",
                }).then(() => {
                  this.$router.push({ path: "/profile" });
                  this.$parent.forceRerender();
                });
              },
              (err) => {
                this.$swal({
                  icon: "error",
                  text: err,
                  confirmButtonColor: "#000000",
                });
              }
            );
        }
      }
    },
    toggleIsClicked1: function () {
      this.emailClicked = !this.emailClicked;
      this.nameClicked = false;
      this.pwClicked = false;
    },

    toggleIsClicked2: function () {
      (this.emailClicked = false), (this.nameClicked = !this.nameClicked);
      this.pwClicked = false;
    },

    toggleIsClicked3: function () {
      this.emailClicked = false;
      this.nameClicked = false;
      this.pwClicked = !this.pwClicked;
    },

    checkPassword() {
      this.password_length = this.password.length;
      if (this.password_length > 7) {
        this.contains_eight_characters = true;
      } else {
        this.contains_eight_characters = false;
      }

      this.contains_number = /\d/.test(this.password);
      this.contains_uppercase = /[A-Z]/.test(this.password);
      this.contains_lowercase = /[a-z]/.test(this.password);

      if (
        this.contains_eight_characters === true &&
        this.contains_lowercase === true &&
        this.contains_uppercase === true &&
        this.contains_number === true
      ) {
        this.valid_password = true;
      } else {
        this.valid_password = false;
      }
    },

    checkAllFilled() {
      if (this.email == "" || this.name == "" || this.password == "") {
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
  width: 420px;
  padding: 1% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 420px;
  margin: 0 auto 100px;
  padding: 30px 45px 70px 45px;
  text-align: center;
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
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 10px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: black;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  border-radius: 30px;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: black;
  transform: scale(1.05);
}

.form .message {
  margin: 15px 0 0;
  color: #919191;
  font-size: 14px;
}
.form .message a {
  color: black;
  text-decoration: none;
}

.has_required {
  text-decoration: line-through;
  color: #689868;
}

/* IS IT CAN REMOVE THESE??

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
.container .info span .fa {
  color: #ef3b3a;
}
*/

#text {
  text-align: left;
  font-size: 16px;
}

#text1 {
  font-weight: bold;
  font-size: 20px;
}

input[type="password"] {
  display: block;
}

ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

li {
  margin-bottom: 8px;
  color: #525f7f;
  position: relative;
}

li:before {
  content: "";
  width: 0%;
  height: 2px;
  background: #bbbbbb;
  position: absolute;
  left: 0;
  top: 50%;
  display: block;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Checkmark & Strikethrough --------- */
.is_valid {
  color: rgba(136, 152, 170, 0.8);
}
.is_valid:before {
  width: 100%;
}

.checkmark_container {
  border-radius: 50%;
  position: absolute;
  top: 265px;
  right: 60px;
  background: white;
  width: 25px;
  height: 25px;
  visibility: hidden;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.4s ease;
}

.show_checkmark {
  visibility: visible;
  opacity: 1;
}

.checkmark {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: black;
  stroke-width: 15;
  stroke-linecap: round;
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
}

.checked {
  animation: draw 0.5s ease forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>