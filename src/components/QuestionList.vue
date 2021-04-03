<template>
  <div class="list-item-container">
    <div class="list-item-head p-8">
      {{question.q}}
      <span class="toggle float-right" @click="question.visible = !question.visible" v-text="toggletText[question.visible * 1]">
      </span>
    </div>
    <div class="list-item-body p-8" v-show="question.visible">
      <slot />
    </div>
  </div>
</template>
<script>
  export default {
    props:["list"],
    data(){
      return { toggletText: ['show', 'hide'] }
    }
  }
</script>

<style scoped>
.list-item-container{
  width: 80%;
  margin: 0 auto;
  background-color: gray;
  margin-bottom: 10px;
}
.p-8{
  padding: 8px;
}
.list-item-head{
  background-color: #35495E;
  color: #fff;
}
.float-right{
  float: right;
}
.toggle{
  cursor: pointer;
}
</style>