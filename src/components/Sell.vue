<template>
<div class="sell-page">
    <h1>Free, Simple, Transparent</h1>
    <p id="words">Be featured today</p>
    <button v-on:click= "startSelling">Start selling on Eatsy</button>
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

#words {
    font-size: 30px;
    color: grey;
    box-sizing: border-box;
    padding-left: 24px;
    padding-right: 24px;
}

</style>
