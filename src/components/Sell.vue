<template>
<div class="sell-page">
    <p id="message"><router-link to="/" exact>Home</router-link><b> / Sell</b></p>
        <header>
        Free, Simple, Transparent
        </header>
    <div class="form">
      <p id="words">Be featured today</p>
      <button v-on:click="startSelling">Start selling on Eatsy</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sell",
  methods: {
    startSelling() {
      this.$router.push("/sellersignup");
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
  color: black;
  font-size: 40px;
  font-weight: bold;
  margin-block: 40px;
}

.sell-page {
  text-align: center;
  margin-bottom: 50px;
}

.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 450px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

button {
  height: 10%;
  background-color: black;
  color: white;
  font-size: 30px;
  border-radius: 30px;
  padding-left:20px;
  padding-right:20px;
}

#words {
  font-size: 25px;
  color: grey;
  box-sizing: border-box;
  padding-left: 24px;
  padding-right: 24px;
}
</style>
