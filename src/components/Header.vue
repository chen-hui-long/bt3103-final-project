<template>
  <div>
    <header>
      <h1><router-link to="/" exact>EATSY</router-link></h1>
      <div class="searchBar">
        <input type="text" placeholder=" Search by keyword!" />
        <img src="@/assets/search.png" />
        <div class="right">
          <h3><router-link to="/login" exact>Login</router-link></h3>
          <span><router-link to="/favorite" exact>❤</router-link></span>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 100px;
  background: #e3dddf;
  font-weight: normal;
  position: sticky;
  top: 0;
}

h1 {
  float: left;
  width: 15%;
  text-align: center;
  font-size: 40px;
  letter-spacing:2px
}

.searchBar {
  display: flex;
  width: 85%;
  height: 100%;
  align-items: center;
  margin: 0;
}

.searchBar > input {
  width: 52%;
  height: 30%;
  font-size: 25px;
  border-radius: 15px;
}

.searchBar > img {
  width: 3%;
  height: auto;
  padding-left: 1%;
}

.right {
  display: flex;
  width: 45%;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5%;
}

.right > h3 {
  width: 30%;
}

a {
  color: black;
  font-size: 35px;
  text-decoration: none;
}
</style>