<template>
  <div class="edit">
    <div class="navbar">
      <NavBar></NavBar>
    </div>
    <!--div class="breadcrumb-wrap">
      <ul class="breadcrumb">
        <li>
          <a><router-link to="/" exact>Home</router-link></a>
        </li>
        <li>
          <a><router-link to="/profile">My Profile</router-link></a>
        </li>
        <li>
          Edit Profile
        </li>
      </ul>
    </div-->
    <header>Edit My Profile</header>
    <div id="form">
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
        <div>
          <button id="delete" v-on:click.prevent="del">
            Delete My Account
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../firebase.js";
import NavBar from "./ProfileNavBar";
import firebase from "@firebase/app";
require("firebase/auth");

export default {
  components: { NavBar },
  data() {
    return {
      userID: "",
      name: "",
      image: "",
      deleting_user_id: "",
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
            this.$router.push({ path: "/profile" });
          });
        });
    },

    del() {
      this.$swal
        .fire({
          icon: "warning",
          iconColor: "#d33",
          text: "Are you sure? This your existing listing too",
          showCancelButton: true,
          confirmButtonText: `Delete`,
          confirmButtonColor: "#d33",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.confirmDel();
          }
        });
    },

    confirmDel() {
      db.collection("Users")
        .doc(this.userID)
        .get()
        .then((doc) => {
          if (doc.data().seller) {
            this.deleteBakery();
          } else {
            firebase
              .auth()
              .currentUser.delete()
              .then(() => {
                this.$router.push({ path: "/login" });
                this.$parent.forceRerender();
              });
          }
        });
      /*
        .then(() => {
          firebase
            .auth()
            .currentUser.delete()
            .then(() => {
              this.$router.push({ path: "/login" });
              this.$parent.forceRerender();
            });
        });
        */
    },

    /*
    deleteBakery: function () {
      //delete in the user who favourite and reviewed the shop
      db.collection("bakeriesNew")
        .doc(this.userID)
        .get()
        .then((doc) => {
          var favourite_users = doc.data().favourite_users;
          var review_users = doc.data().review_users;
          for (var i = 0; i < favourite_users.length; i++) {
            db.collection("Users")
              .doc(favourite_users[i])
              .update({
                favourite: firebase.firestore.FieldValue.arrayRemove(
                  this.userID
                ),
                total_favourite: firebase.firestore.FieldValue.increment(-1),
              })
              .then(() => {
                console.log("deleted");
              })
              .then(() => console.log("fav deleted"));
          }

          for (var j = 0; j < review_users.length; j++) {
            this.deleting_user_id = review_users[j];
            //console.log(this.deleting_user_id);
            db.collection("Users")
              .doc(this.deleting_user_id)
              .get()
              .then((doc) => {
                var curr_user_reviews = doc.data().reviews;
                for (var k = 0; k < curr_user_reviews.length; k++) {
                  if (curr_user_reviews[k].UID == this.userID) {
                    var review = curr_user_reviews[k];
                    //console.log(this.deleting_user_id);
                    db.collection("Users")
                      .doc(this.deleting_user_id)
                      .update({
                        reviews: firebase.firestore.FieldValue.arrayRemove(
                          review
                        ),
                        total_review: firebase.firestore.FieldValue.increment(
                          -1
                        ),
                      })
                      .then(() => console.log("deletion complete"));
                  }
                }
              })
              .then(() => console.log("user loop done"));
          }
        })
        .then(() => console.log("fav and review all deleted"))
        .then(() => {
          db.collection("bakeriesNew").doc(this.userID).delete();
          db.collection("Users").doc(this.userID).update({
            seller: false,
          });
        });
    },
    */
    deleteBakery: function () {
      //delete in the user who favourite and reviewed the shop
      db.collection("bakeriesNew")
        .doc(this.userID)
        .get()
        .then((doc) => {
          var favourite_users = doc.data().favourite_users;
          var review_users = doc.data().review_users;

          for (var i = 0; i < favourite_users.length; i++) {
            db.collection("Users")
              .doc(favourite_users[i])
              .update({
                favourite: firebase.firestore.FieldValue.arrayRemove(
                  this.userID
                ),
                total_favourite: firebase.firestore.FieldValue.increment(-1),
              })
              .then(() => {
                console.log("deleted");
              })
              .then(() => console.log("fav deleted"));
          }

          for (var j = 0; j < review_users.length; j++) {
            this.deleting_user_id = review_users[j];
            console.log(this.deleting_user_id);
            db.collection("Users")
              .doc(this.deleting_user_id)
              .get()
              .then((doc) => {
                var curr_user_reviews = doc.data().reviews;
                for (var k = 0; k < curr_user_reviews.length; k++) {
                  if (curr_user_reviews[k].UID == this.userID) {
                    var review = curr_user_reviews[k];
                    console.log(this.deleting_user_id);
                    db.collection("Users")
                      .doc(this.deleting_user_id)
                      .update({
                        reviews: firebase.firestore.FieldValue.arrayRemove(
                          review
                        ),
                        total_review: firebase.firestore.FieldValue.increment(
                          -1
                        ),
                      })
                      .then(() => console.log("deletion complete"));
                  }
                }
              })
              .then(() => console.log("user loop done"));
          }
        })
        .then(() => console.log("fav and review all deleted"))
        .then(() => {
          db.collection("bakeriesNew").doc(this.userID).delete();
          db.collection("Users")
            .doc(this.userID)
            .update({
              seller: false,
            })
            .then(() => {
              firebase
                .auth()
                .currentUser.delete()
                .then(() => {
                  this.$router.push({ path: "/login" });
                  this.$parent.forceRerender();
                });
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
/*.links {
  text-align: left;
  padding: 10px;
}*/

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
  width: 350px;
}

#image-upload-div {
  margin-bottom: 3em;
}

header {
  text-align: center;
  color: black;
  font-size: 40px;
  font-weight: bold;
  margin-block: 40px;
}

#form {
  display: block;
  text-align: center;
  margin-bottom: 80px;
}
form {
  position: relative;
  background: #ffffff;
  padding: 45px 200px 80px;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  border: #bbbbbb solid 1px;
  border-radius: 10px;
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
  width: 350px;
}

#update {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: black;
  width: 350px;
  /*border: 0;*/
  border: 1px solid black;
  padding: 5px 10px;
  margin-top: 30px;
  color: white;
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

#delete {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: rgb(255, 255, 255);
  width: 350px;
  /*border: 0;*/
  border: 1px solid black;
  padding: 5px 10px;
  margin-top: 30px;
  color: #000000;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  border-radius: 30px;
}

#delete:hover,
#delete:active,
#delete:focus {
  /*background: black;*/
  transform: scale(1.05);
  color: #bbbbbb;
}

.navbar {
  text-align: center;
}

/*
.breadcrumb-wrap {
  position: relative;
  padding-left: 60px;
}

ul.breadcrumb {
  padding: 8px 16px;
  list-style: none;
  font-size: 18px;
}

ul.breadcrumb li {
  display: inline;
}

ul.breadcrumb li + li:before {
  padding: 8px;
  color: #626262;
  content: "/\00a0";
}

ul.breadcrumb li a {
  color: #626262;
  text-decoration: none;
}
*/
</style>




