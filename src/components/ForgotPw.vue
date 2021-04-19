<template>
  <div class = "reset-pw">
  <div class="form">
    <h3>Reset your password</h3>
    <p> Enter your email address and we'll send you a link to reset your password. </p><br>
    <form novalidate @submit.prevent="forgotPassword">
      <label style="font-weight:bold" for="email">Email:</label><br>
      <input type="text" v-model="email" value="email" id="email"><br><br>
      <button class="end" type="submit">Submit</button>
    </form>
  </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email:''
    }
  },
  methods: {
    forgotPassword() {
        firebase
            .auth()
            .sendPasswordResetEmail(this.email)
            .then(() => {
              alert('Check your Registered Email to Reset Password!')
            }).catch((error) => {
          alert(error)
        })
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: left;
}
.reset-pw {
  width: 420px;
  padding: 1% 0 0;
  margin: auto;

}

.form{
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 420px;
  margin: 80px auto 100px;
  padding: 30px 45px 70px 45px;
  text-align: center;
  border: #bbbbbb solid 1px;
  border-radius: 10px;
  text-align:left;
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


</style>