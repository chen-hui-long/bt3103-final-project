<template>
  <div>
    <div class="navbar">
      <NavBar></NavBar>
    </div>
    <div class ="top-profile">
      <img class = "profile-pic" :src="this.bakery[0].images[0]" />
      <div class = "profile-info">
      <a class = "shop-name">{{ this.bakery[0].shop_name }}</a>
      <br>
      <a> {{this.bakery[0].total_ratings_by_users}} Total Reviews </a>
      <br>
      <a> {{this.bakery[0].total_favourites_by_users}} Total Favourites</a>
      </div>
      </div>
    <div class="body">
      <table>
        <tr>
          <td class = "heading">
            <button class ="edit" v-on:click="edit">Edit my listing </button>
            </td>
        </tr>
        <tr>
          <td class = "heading">Short description of business and specialties</td>
          <td>{{this.bakery[0].short_desc}}</td>
        </tr>
        <tr>
          <td class = "heading">Product types</td>
          <td>
            <li v-for = "(type, index) in this.bakery[0].type" v-bind:key= "index"> 
              {{type}}
              </li>
          </td>
        </tr>
        <tr>
          <td class = "heading">Dietary types & options</td>
          <td>
            <li v-for = "(diet, index) in this.bakery[0].dietary" v-bind:key= "index"> 
              {{diet}}
              </li>
          </td>
        </tr>
        <tr>
          <td class = "heading">Order options</td>
          <td>{{this.bakery[0].order_details}}</td>
        </tr>
        <tr>
          <td class = "heading">Business email</td>
          <td>{{this.bakery[0].business_email}}</td>
        </tr>
        <tr>
          <td class = "heading">Official website</td>
          <td>{{this.bakery[0].official_website}}</td>
        </tr>
        <tr>
          <td class = "heading">Instagram</td>
          <td>{{this.bakery[0].instagram}}</td>
        </tr>
        <tr>
          <td class = "heading">Facebook</td>
          <td>{{this.bakery[0].facebook}}</td>
        </tr>
        <tr>
          <td class = "heading">Shop Pictures</td>
          <td>
            <img class = "shop-pic" :src="this.bakery[0].images[0]" />
            <img class = "shop-pic" :src="this.bakery[0].images[1]" />
            <img class = "shop-pic" :src="this.bakery[0].images[2]" />
            <img class = "shop-pic" :src="this.bakery[0].images[3]" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import NavBar from "./ProfileNavBar";
import firebase from "@firebase/app";
require("firebase/auth");
import db from "../firebase.js";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      userID: firebase.auth().currentUser.uid,
      isSeller: null,
      user: [],
      bakery: [],
    };
  },
  methods: {
    fetchItems: function () {
      db.collection("Users")
        .doc(this.userID)
        .get()
        .then((doc) => {
          this.user.push(doc.data());
          this.isSeller = doc.data().seller;
        })
        .then(() => {
          if (!this.isSeller) {
            console.log("this is not a seller yet");
            this.$router.push({ path: "/sell" });
          } else {
            this.getBakery();
          }
        });
    },

    getBakery: function () {
      db.collection("bakeriesNew")
        .doc(this.userID)
        .get()
        .then((doc) => {
          this.bakery.push(doc.data());
          console.log(this.bakery);
        });
    },

    edit: function() {
      this.$router.push({path: "/editlisting"})
    }
  },

  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
.navbar {
  text-align: center;
}

.body {
  font-size:15px;

}

.shop-pic {
  height:150px;
  width:150px;
  margin-right:10px
}


table {
  border-spacing:3em;
  margin-left:auto;
  margin-right:auto;
}

.heading {
  padding-right:150px;
}

.profile-pic {
  border-radius: 50%;
  width:150px;
  height:150px;
}

.top-profile {
  display:flex;
    align-items: center;
  justify-content: center;
}

.shop-name {
  font-size: 25px;
}

.profile-info {
  margin-left:30px;
}
.edit {
  background-color:rgba(202, 206, 205, 0.753);
  border-radius: 8px;
border: none;
  
}
.edit:hover {
    cursor: pointer;
    background-color: #e3dddf;
}
</style>