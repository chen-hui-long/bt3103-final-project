<template>
    <div class="faq-page">
      <NavBar></NavBar>
      <header>Frequently Asked Questions (FAQs) </header>
    <questionList v-for="(item, index) in dynamicList" :key="index"   :question="item">
        {{item.a}}
    </questionList>
    </div>
</template>

<script>
  import QuestionList from "./QuestionList";
  export default {
    components: { QuestionList },
    data(){
      return { dynamicList: [] }
    }, 
    methods: {
      prepareDynamicList(){
        let list = [
            {q: "How do I make a purchase?",
            a: "Contact the bakeries directly through the platforms listed on their profiles! :-)"}
        ];
        list.forEach(element =>{
            this.dynamicList.push({...element, visible: false});
        });
      }
    },
  }
</script>

<style scoped>
header {
  text-align: center;
  color: black;
  font-size: 40px;
  font-weight: bold;
  margin-block: 40px;
}

</style>