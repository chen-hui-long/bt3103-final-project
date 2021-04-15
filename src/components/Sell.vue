<template>
  <div>
    <div class="sell-page">
      <br><br><header>Free, Simple, Transparent</header><br>
      <div class="form">
        <p id="words">Be featured today</p>
        <button v-on:click="startSelling">Start selling on Eatsy</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sell",
  components: {
  },

  methods: {
    startSelling() {
      this.$router.push({ path: "/sellform" });
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
  /*margin-block: 40px;*/
}

.sell-page {
  text-align: center;
}

/*.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 450px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}*/


.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 420px;
  margin: 0 auto 100px;
  padding: 30px 45px 70px 45px;
  text-align: center;
  border: #bbbbbb solid 1px;
  border-radius: 10px;
  /*box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);*/
}

/*button {
  height: 10%;
  background-color: black;
  color: white;
  font-size: 30px;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
}*/

.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: black;
  width: 80%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  border-radius: 30px;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: black;
  transform: scale(1.05);
}

#words {
  font-size: 20px;
  color: grey;
  box-sizing: border-box;
  padding-left: 24px;
  padding-right: 24px;
}

.links {
  padding-left:20px;
}
</style>
