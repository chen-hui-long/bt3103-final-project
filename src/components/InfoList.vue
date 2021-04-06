<template>
  <div class="list-item-container">
    <div class="list-item-head p-8">
      {{item.question}}
      <span class="toggle float-right" @click="item.visible = !item.visible" 
            v-text="toggletText[item.visible * 1]">
      </span>
    </div>
    <div class="list-item-body p-8" v-show="item.visible"> 
      <slot />
    </div>
  </div>
</template>
<script>
export default {

  data(){
    return { toggletText: ['show', 'hide'] }
  }
}
</script>
<style scoped>
.list-item-container{
  width: 80%;
  margin: 0 auto;
  background-color: #e3dddf;
  margin-bottom: 10px;
}
.p-8{
  padding: 8px;
}
.list-item-head{
  background-color: #bbbbbb ;
  color: #fff;
}
.float-right{
  float: right;
}
.toggle{
  cursor: pointer;
}
</style>rgba(194, 18, 76, 0.486)