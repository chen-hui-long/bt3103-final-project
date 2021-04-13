<template>
    <div class="faq">
      <NavBar></NavBar>
      <header>Frequently Asked Questions (FAQs) </header>
    <infoList v-for="(item, index) in dynamicList" :key="index" :user="item" >
      {{item.a}}
    </infoList> 
    
  </div>
</template>

<script>
import InfoList from "./InfoList";
export default {
  name: "Faq",
  components: { InfoList },
  data(){
    return {
      dynamicList: []
    }
  },
  methods: {
    prepareDynamicList(){
      let list = [
        {question: "How do I make a purchase?", 
        a: "Contact the bakeries directly through the platforms listed on their profiles! :-)"},
        {question: "Can I list my restaurant here? ", 
        a: "Sorry, our website currently caters to home bakeries only! :-("},
        {question: "Didn't find the answer to your question?", 
        a: "Contact us directly @ EMAIL and we'll get back to you soon! :-)"}
      ];
      list.forEach(element => {
       this.dynamicList.push({...element, visible: false});
      });
    },
    update(user) {
      this.user = user;
    }
  },
  async created(){
    await this.prepareDynamicList();
  },

};
</script>

<style scoped>
header {
  text-align: center;
  color: black;
  font-size: 40px;
  font-weight: bold;
  margin: 40px;
}

.faq {
  text-align: center;
  margin-bottom: 50px;
}

</style>
