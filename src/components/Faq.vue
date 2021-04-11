<template>
  <div class="faq">
    <NavBar></NavBar>
    <header>Frequently Asked Questions (FAQs)</header>
    <details>
      <summary>How do I make a purchase?</summary>
      <p>
        Contact the bakeries directly through the platforms listed on their
        profiles! :-)
      </p>
    </details>
    <details>
      <summary>Can I list my restaurant here?</summary>
      <p>Sorry, our website currently caters to home bakeries only! :-(</p>
    </details>
    <details>
      <summary>Didn't find the answer to your question?</summary>
      <p>Contact us directly @ EMAIL and we'll get back to you soon! :-)</p>
    </details>
  </div>
</template>

<script>
export default {
  name: "Faq",
  data() {
    return {
      dynamicList: [],
    };
  },
  methods: {
    prepareDynamicList() {
      let list = [
        {
          question: "How do I make a purchase?",
          a:
            "Contact the bakeries directly through the platforms listed on their profiles! :-)",
        },
        {
          question: "Can I list my restaurant here? ",
          a: "Sorry, our website currently caters to home bakeries only! :-(",
        },
        {
          question: "Didn't find the answer to your question?",
          a: "Contact us directly @ EMAIL and we'll get back to you soon! :-)",
        },
      ];
      list.forEach((element) => {
        this.dynamicList.push({ ...element, visible: false });
      });
    },
  },
  async created() {
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
  margin-block: 40px;
}

* {
  box-sizing: border-box;
  transition: 0.5s;
}
body {
  padding: 0 2rem;
}
/*** Specific styles ***/
details {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid darkslategray;
  margin-left: 50px;
  margin-right:50px;
}
summary {
  list-style-type: none;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  outline: none;
  color: darkslategray;
}
summary::after {
  content: "▼";
  padding: 0.5rem;
  position: absolute;
  right: 0.25rem;
  top: -0.5rem;
  color: black;
}
details[open] {
  background: whitesmoke;
}
details[open] summary {
  color: dimgrey;
}
details[open] summary::after {
  content: "▲";
}
/*** End specific styles ***/
p {
  color: dimgrey;
  letter-spacing: 1.5;
}
</style>
