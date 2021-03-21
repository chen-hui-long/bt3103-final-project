<template>
  <div>
    <header>
      <nav>
        <div class="logo"><span><router-link to="/" exact>EATSY</router-link></span></div>
        
        <div class="search">
          <input type="text" placeholder="Search by keyword!" />
          <button id = "search-icon">	&#8981;</button>

        </div>

        <div class="login">
          <ul>
            <li><router-link to="/login" exact>Login</router-link></li>
            <li><router-link to="/favorite" exact><span id="heart-icon">♡</span></router-link></li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {};
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
  justify-content: center;
  height: 45%;
  position: relative;
  
}

.search > input {
  display: flex;
  width: 80%;
  border-radius: 15px;
  align-items: center;
  font-size: 18px;
  text-indent: 15px;
  border: 2px solid #bbbbbb;
}

.search > button {
  border: none;
  background: none;
  cursor: pointer;
}

#search-icon {
    transform: rotate(270deg);
    font-size: 66px;
    block-size: 4.5vw;
    color: rgba(7, 7, 7, 0.39);
    line-height: 45px;
    position: absolute;
    bottom: -1.4vh;
    right: 6.8vw;
}

#search-icon:hover {
    background: #d3cdcf7c;
    transition: 0.5s;
    border-radius: 0 0 15px 15px;
}

.logo {
  display: flex;
  width: 20%;
  height: 50%;
  justify-content: center;
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
  width: 30%;
  justify-content:space-evenly;
}

.login ul,
.ul {
  display: flex;
}

.login ul li a,
.search ul li a {
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