<template>
  <div class="login-page">
    <!--header>Welcome Back</header-->
    <div class="form">
      <form class="login-form">
        <h3>Sign in</h3>
        <br />
        <input
          type="text"
          :style="emailClicked ? { 'border-color': 'black' } : null"
          v-on:click="toggleIsClicked1"
          v-model="email"
          placeholder="Email"
        />
        <input
          type="password"
          :style="pwClicked ? { 'border-color': 'black' } : null"
          v-on:click="toggleIsClicked2"
          v-model="password"
          placeholder="Password"
        />
        <router-link to="/forgot">Forgot Password?</router-link><br /><br />
        <button v-on:click.prevent="login">sign in</button>
        <p class="message">
          Not registered? <router-link to="/signup" exact>Sign Up</router-link>
        </p>
        <p class="message">
          Interested to sell on Eatsy?
          <router-link to="/sell" exact>Click Here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "@firebase/app";

require("firebase/auth");
export default {
  data() {
    return {
      email: "",
      password: "",
      emailClicked: true,
      pwClicked: false,
    };
  },

  methods: {
    login: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$swal.fire({
              icon: "success",
              title: "Login sucessful",
              confirmButtonColor: "#000000",
            }).then(() => {
            console.log(user)
            this.$router.push({ path: "/profile" });
            this.$parent.forceRerender();
            })
          },
          (err) => {
            this.$swal({
              icon: 'error',
              text: err,
              confirmButtonColor: "#000000",
            });
          }
        );
    },
    toggleIsClicked1: function () {
      this.emailClicked = true;
      this.pwClicked = false;
    },

    toggleIsClicked2: function () {
      this.emailClicked = false;
      this.pwClicked = true;
    },
    /*
        redirect: function() {
          var user = firebase.auth().currentUser
          var user_uid = user.uid;
          console.log(user_uid)
          var doc_user = db.collection("Users").doc(user_uid);
          doc_user.get().then(doc => {
            if (doc.exists) {
              console.log("this is a user")
              this.$router.push({path: "/profile"})
            } else {
              console.log("this is a seller")
              this.$router.push({path: "/sellerprofile"})
            }
          })
        }
        */
  },
};
</script>

<style scoped>
h3 {
  text-align: left;
}
/*header {
  text-align: center;
  color: black;
  font-size: 40px;
  font-weight: bold;
  margin-block: 40px;
}*/

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

/*do we need this???*/
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
</style>