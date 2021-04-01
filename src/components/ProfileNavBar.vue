<template>
  <div id="profile-nav">
    <router-link id="profile" to="/profile">My Profile</router-link>
    <a>|</a>
    <router-link id="listing" to="/sellerprofile">My Listing</router-link>
    <hr>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
#profile-nav {
  font-size: 20px;
  text-decoration: none;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left:20px;
}

a {
  text-decoration: none;
  margin-right: 20px;
}

</style>