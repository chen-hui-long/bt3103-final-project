<template>
  <div class="edit">
    <!--
    <div class="links">
      <router-link id="profile" to="/profile">My Profile / </router-link>
      <router-link id="edit" to="/editProfile">Edit</router-link>
      
    </div>
    -->
    <form action="/action_page.php">
      <div id="image-upload-div">
        <div id="title">Upload your image:</div>
        <input id="text" type="file" @change="changeImage" accept="image/*" />
        <br /><img v-if="this.image" :src="image" />
        <img v-else :src="this.image" />
      </div>

      <div id="name-update">
        <label id="title">Name: </label><br />
        <input
          id="text"
          type="text"
          v-model="name"
          placeholder="Name"
        /><br /><br />
        <button id="update" v-on:click.prevent="save">UPDATE</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase.js";
import firebase from "@firebase/app";
require("firebase/auth");

export default {
  data() {
    return {
      userID: "",
      name: "",
      image: "",
    };
  },

  methods: {
    changeImage(event) {
      const file = event.target.files.item(0);
      const reader = new FileReader();
      reader.addEventListener("load", this.imageLoaded);
      reader.readAsDataURL(file);
    },
    imageLoaded(event) {
      this.image = event.target.result;
    },

    fetchOrigin() {
      db.collection("Users")
        .doc(this.userID)
        .get()
        .then((doc) => {
          const data = doc.data();
          this.name = data.name;
          this.image = data.image;
        });
    },

    save() {
      db.collection("Users")
        .doc(this.userID)
        .update({
          name: this.name,
          image: this.image,
        })
        .then(() => {
          this.$swal({
            icon: "success",
            text: "Updated Successfully",
            confirmButtonColor: "#000000",
          }).then(() => {
            this.$router.push({path:"/profile"})
          });
        });
    },
  },

  created() {
    this.userID = firebase.auth().currentUser.uid;
    this.fetchOrigin();
  },
};
</script>

<style scoped>
.links {
  text-align: left;
  padding: 10px;
}

#home {
  color: gray;
}

#profile {
  color: gray;
}

#title {
  font-weight: bold;
}
#text {
  width: 400px;
}

#image-upload-div {
  margin-bottom: 3em;
}
form {
  position: relative;
  background: #ffffff;
  margin: 0 100px 100px;
  padding: 45px;
}

form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border-radius: 5px;
  border: 0;
  margin: 0 0 15px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
}

form label {
  float: left;
}

img {
  width: 250px;
}

#update {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: black;
  width: 40%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  border-radius: 30px;
}

#update:hover,
#update:active,
#update:focus {
  background: black;
  transform: scale(1.05);
}
</style>




