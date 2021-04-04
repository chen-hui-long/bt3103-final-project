<template>
<div class="login-page">
  <!--header>Register</header-->
  <div class="form">
    <form class="register-form">
      <div id ="text">
      <span id = "text1"> Create your account </span><br>
      <span> Registration is easy. </span> </div><br>
      <input type="text" :style="emailClicked ? { 'border-color': 'black'} : null" 
        v-on:click = "toggleIsClicked1" v-model ="email" placeholder="Email*"/>
      <input type="text" :style="nameClicked ? { 'border-color': 'black'} : null" 
        v-on:click = "toggleIsClicked2" v-model="name" placeholder = "Name*"/>
      <input type="password" :style="pwClicked ? { 'border-color': 'black'} : null" 
        v-on:click = "toggleIsClicked3" v-model ="password" placeholder="Password*"/>
      <button v-on:click.prevent = "register">Register</button>
      <p class="message">Have An Account ? <router-link to="/login" exact>Login</router-link></p>
    </form>
  </div>
</div>
    
</template>

<script>
import db from '../firebase.js';
import firebase from '@firebase/app';
//import func from 'vue-editor-bridge';
require('firebase/auth');
export default {
    data() {
        return {
            emailClicked:true,
            nameClicked: false,
            pwClicked: false,
            email: "", 
            password: "", 
            name: "",
            default_image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.business2community.com%2Fwp-content%2Fuploads%2F2017%2F08%2Fblank-profile-picture-973460_640.png&imgrefurl=https%3A%2F%2Fwww.business2community.com%2Fsocial-media%2Fimportance-profile-picture-career-01899604&tbnid=ZbfgeaptF8Y5ZM&vet=12ahUKEwjK19qH57vvAhXCm0sFHdcJD5UQMygAegUIARCnAQ..i&docid=Smb2EEjVhvpzWM&w=640&h=640&q=profile%20picture&ved=2ahUKEwjK19qH57vvAhXCm0sFHdcJD5UQMygAegUIARCnAQ "
        }
    }, 

    methods: {
        register: function() {
            const curr_user = {email:this.email, name:this.name, favourite:[], reviews: {}, total_review: 0, seller: false, total_favourite: 0, image: this.default_image} 
            console.log(curr_user)
            console.log("register start")
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(cred => {
                db.collection("Users").doc(cred.user.uid).set(
                  Object.assign({}, curr_user)
                )
                this.$router.push({path: "/profile"})
                this.$parent.forceRerender();
            }, err => {
                alert(err.message);
            })
            console.log("end")
        },
        toggleIsClicked1: function() {
          this.emailClicked = !this.emailClicked
          this.nameClicked = false
          this.pwClicked = false
        },

        toggleIsClicked2: function() {
          this.emailClicked = false,
          this.nameClicked = !this.nameClicked
          this.pwClicked = false
        },

        toggleIsClicked3: function() {
          this.emailClicked = false
          this.nameClicked = false
          this.pwClicked = !this.pwClicked
        }
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
  width: 420px;
  padding: 1% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
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
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  border-radius: 30px;
}
.form button:hover,.form button:active,.form button:focus {
  background: black;
  transform: scale(1.05)
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

#text {
  text-align: left;
  font-size: 16px;

}

#text1 {
  font-weight: bold;
  font-size: 20px;
}

/*header {
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
*/
</style>