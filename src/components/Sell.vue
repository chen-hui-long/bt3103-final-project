<template>
<div id="sell-page">
    <header>
        Free, Simple, Transparent
        </header>
    <p id="words">Be featured today</p>
    <button  v-on:click= "startSelling">Start selling on Eatsy</button>
  </div>
</template>

<script>
export default {
    name: 'Sell',
    methods: {
        startSelling() { 
            this.$router.push('./components/Selling.vue')
        }
    }
}
</script>

<style>

header {
    text-align: center;
    color: black;
    font-size: 40px;
    font-weight: bold;
    margin-block: 40px;
}

#sell-page {
    text-align: center;
    margin-bottom: 50px;
}

button{
    height: 60px;
    width: 200px;
    background-color: black;
    color: white;
    font-size: 50px;
    border-radius: 30px;
}

#words {
    font-size: 20px;
    color: grey;
    box-sizing: border-box;
    padding-left: 24px;
    padding-right: 24px;
}


</style>
