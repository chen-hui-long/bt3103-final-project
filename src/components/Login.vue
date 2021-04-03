<template>
<div class="login-page">
  <header>Welcome Back</header>
  <div class="form">
    <form class="login-form">
      <input type="text" v-model = "email" placeholder="Email"/>
      <input type="password" v-model = "password" placeholder="Password"/>
      <button v-on:click.prevent = "login">login</button>
      <p class="message">Not registered? <router-link to="/signup" exact>Sign Up</router-link></p>
      <p class="message">Interested to sell on Eatsy?  <router-link to="/sell" exact>Click Here</router-link></p>
    </form>
  </div>
</div>
    
</template>

<script>
import firebase from '@firebase/app';
require('firebase/auth');
export default {
    data() {
        return {
            email: "", 
            password: "", 
        }
    }, 

    methods: {
        login: function() {
            console.log("register start")
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
                console.log(user.user.email)
                alert("you are logged in as")
                alert(user.user.email);
                this.$router.push({path: "/profile"})
                this.$parent.forceRerender();
            }, err => {
                alert(err.message);
            })
            console.log("end")
            
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
    }

}
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
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
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
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
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
  color: #EF3B3A;
}


</style>