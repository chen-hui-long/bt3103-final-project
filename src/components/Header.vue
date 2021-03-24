<template>
  <div>
    <header>
      <nav>
        <div class="logo"><span><router-link to="/" exact>EATSY</router-link></span></div>
        
        <div class="search">
          <input type="text" placeholder="Search by keyword!" />
          <button id = "search-icon">	&#8981;</button>
        </div>
        
        <div v-if="signedIn" class="login">
          <ul>
            <li><router-link to="/profile" exact>Profile</router-link></li>
            <li><router-link to="/favorite" exact><span id="heart-icon">♡</span></router-link></li>
          </ul>
        </div>
        <div v-else>
        <div class="login">
          <ul>
            <li><router-link to="/login" exact>Login</router-link></li>
            <li><router-link to="/favorite" exact><span id="heart-icon">♡</span></router-link></li>
          </ul>
        </div>
        </div>

      </nav>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signedIn: false,
      username:""
    }
  },
    methods: {
    toggleSignIn(username) {
      this.signedIn = true;
      this.username = username;
      this.$router.push("/");
    },
    toggleSignOut() {
      this.signedIn = false;
      this.username = "";
    }
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
  overflow:auto;
  position:sticky;
}
nav {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.search {
  display: flex;
  width: 80%;
  height: 45%;
  justify-content: center;
  position: relative;
  
}

.search > input {
  width: 80%;
  /*width: fit-content;*/
  padding:0 48% 0 0;
  border-radius: 15px;
  align-items: center;
  font-size: 18px;
  text-indent: 15px;
  border: 2px solid #bbbbbb;

  /*overflow:hidden;*/
  /*display:inline-block;*/

  cursor:text;
}


.search > button {
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 6.8vw;
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
  margin-left:50px;
  height: 50%;
  justify-content: center;
  color:none;
}
.logo span {
  font-size: 44px;
  letter-spacing: 2px;
  line-height: 48px;
  font-weight: bold;
}

.login {
  display: flex;
  height:50%;
  /*width: 30%;*/
  margin-right: 50px;
  justify-content:space-evenly;
}

.login ul,
.ul {
  display: flex;
}

.login ul li a{
  padding: 35px 50px;
  color: black;
  font-size: 25px;
  font-weight:bold;
  line-height: 48px;
}

.login a:hover {
  background: #d3cdcf;
  transition: 0.5s;
}

#heart-icon {
    line-height: 44px;
    font-size: 32px;
    font-family: system-ui;
    font-weight: 500;
  
}


</style>