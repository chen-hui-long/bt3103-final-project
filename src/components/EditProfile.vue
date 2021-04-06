<template>
  <div class="edit">
    <div class="links">
      <router-link id="home" to="/home">Home / </router-link>
      <router-link id="profile" to="/profile">Profile / </router-link>
      <router-link id="edit" to="/editProfile">Edit</router-link>
    </div>

    <form action="/action_page.php">
      <div id="image-upload-div">
        <div id="img">Upload your image:</div>
        <input type="file" @change="changeImage" accept="image/*" />
        <img v-if="this.image" :src="image" />
        <img v-else :src="this.image" />
      </div>

      <label>Name: </label>
      <input type="text" v-model="name" placeholder="Name" />
      <button id="update" v-on:click="save">Update</button>
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
          alert("Update successfully!");
        });
      this.$router.push({ path: "/profile" });
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

form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  margin: 0 auto 100px;
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
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

form label {
  float: left;
}

img {
  width: 50%;
}
</style>




