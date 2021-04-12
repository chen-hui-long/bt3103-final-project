<template>
  <div class="list-item-container">
    <div class="list-item-head p-8">
      {{user.question}}
      <span class="toggle float-right" @click="makeVisible"
            v-text="toggletText[user.visible * 1]">
      </span>
    </div>
    <div class="list-item-body p-8" v-show="user.visible"> 
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props:["user"],
  data(){
    return { toggletText: ['show', 'hide'] }
  },
  methods: {
    makeVisible(){
    let temp = this.user;
    temp.visible = !temp.visible;
    this.$emit("update-user", temp)
    }
  }
}
</script>
<style scoped>
.list-item-container{
  width: 80%;
  margin: 0 auto;
  background-color: #dcdcdcb2;
  margin-bottom: 10px;
}
.p-8{
  padding: 8px;
}
.list-item-head{
  background-color: #3a4562;
  color: #fff;
}
.float-right{
  float: right;
}
.toggle{
  cursor: pointer;
}
</style>rgba(194, 18, 76, 0.486)