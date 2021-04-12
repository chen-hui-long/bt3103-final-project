<template>
  <div>
    <header>
      <nav>
        <div class="logo">
          <span><router-link to="/" exact>EATSY</router-link></span>
        </div>

        <div class="search">
          <input
            type="text"
            placeholder="Search by keyword!"
          />
          <button id="search-icon">&#8981;</button>
        </div>

        <div v-if="signedIn" class="login">
          <ul>
            <!--li>  
            <a href ="#" v-on:click ="toMyProfile">Profile</a>
            </li-->

            <li class="dropdown">
              <a href="#">Profile</a>
              <div class="dropdown-content">
                <a href="#" v-on:click="toMyProfile" id="menu"
                  >View your profile</a
                >
                <a href="#" v-on:click="logout" id="menu">Log out</a>
              </div>
            </li>
            <!--
            <li id="fav">
              <router-link to="/favorite" exact
                ><span id="heart-icon">♡</span></router-link
              >
            </li>
            -->
            <!--li><a href ="#" v-on:click ="logout">Logout</a></li-->
          </ul>
        </div>
        <div v-else>
          <div class="login">
            <ul>
              <li><router-link to="/login" exact>Login</router-link></li>
              <!--
              <li>
                <router-link to="/favorite" exact
                  ><span id="heart-icon">♡</span></router-link
                >
              </li>
              -->
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import firebase from "@firebase/app";
require("firebase/auth");
export default {
  data() {
    return {
      signedIn: false,
      currentUser: false,
    };
  },

  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
          this.$parent.forceRerender();
        });
    },
    checkLogin: function () {
      if (firebase.auth().currentUser) {
        this.signedIn = true;
        this.currentUser = firebase.auth().currentUser;
      }
    },
    toMyProfile: function () {
      this.$router.push({ path: "/profile" });
    },

  },

  created() {
    this.checkLogin();
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
}

header {
  box-sizing: border-box;
  width: 100vw;
  height: 100px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #e3dddf;
  top: 0;
  /*overflow:auto;*/
  /* position:sticky;*/
}

nav {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  /*overflow: hidden;*/
}

.search {
  display: flex;
  width: 70%;
  height: 45%;
  padding-left: 100px;
  justify-content: center;
  position: relative;
}

.search > input {
  width: 85%;
  /*width: fit-content;*/
  padding: 0 40% 0 0;
  border-radius: 15px;
  align-items: center;
  font-size: 18px;
  text-indent: 15px;
  border: 2px solid #bbbbbb;
  /*overflow:hidden;*/
  /*display:inline-block;*/

  cursor: text;
}

.search > button {
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 5vw;
  line-height: 60px;
  bottom: -12px;
  padding: 4px 3px;
}

#search-icon {
  transform: rotate(270deg);
  font-size: 66px;
  color: rgba(7, 7, 7, 0.39);
}

.search > button:hover {
  background: #d3cdcf7c;
  transition: 0.5s;
  border-radius: 0 0 15px 15px;
}

.logo {
  display: flex;
  /*width: 20%;*/
  margin-left: 50px;
  height: 50%;
  justify-content: center;
  color: none;
}
.logo span {
  font-size: 44px;
  letter-spacing: 2px;
  line-height: 48px;
  font-weight: bold;
}

.login {
  display: flex;
  height: 50%;
  /*width: 30%;*/
  justify-content: space-evenly;
}

.login ul,
.ul {
  display: flex;
}

.login ul a {
  padding: 37px 25px;
  color: black;
  font-size: 22px;
  font-weight: bold;
  line-height: 48px;
}

.login a:hover {
  background: #d3cdcf;
  transition: 0.5s;
}

#heart-icon {
  line-height: 40px;
  font-size: 36px;
  font-family: system-ui;
  font-weight: 500;
}

#menu {
  font-size: 14px;
  padding: 0px 20px;
  font-weight: lighter;
}
.dropbtn:hover {
  background: #d3cdcf;
  transition: 0.5s;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  border-radius: 10px;
  background-color: #f9f9f9;
  /*min-width: 160px;*/
  width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(100, 100, 100, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  margin: 10px 0px;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>