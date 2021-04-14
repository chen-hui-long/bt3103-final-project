<template>
  <div>
    <multiselect
      @input="emit"
      v-model="value"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="What type of bakes are you selling?"
      label="type"
      track-by="type"
      :preselect-first="false"
    >
      <template slot="selection" slot-scope="{ values, isOpen }"
        ><span
          class="multiselect__single"
          v-if="values.length &amp;&amp; !isOpen"
          >{{ values.length }} options selected</span
        ></template
      >
    </multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import db from "../firebase.js";
import firebase from "@firebase/app";
require("firebase/auth");
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: [],
      options: [
        { type: "Breads" },
        { type: "Brownies" },
        { type: "Cakes" },
        { type: "Cheesecakes" },
        { type: "Cookies & Biscuits" },
        { type: "Chocolate Confections" },
        { type: "Cupcakes & Muffins" },
        { type: "Donuts" },
        { type: "Festive Baked Goods"},
        { type: "Macarons" },
        { type: "Pastries" },
        { type: "Traditional Desserts" },
        { type: "Others" },
      ],
      userID: firebase.auth().currentUser.uid,
      isSeller: null,
      selected: [], 
    };
  },

  methods: {
    emit: function () {
      this.$emit("input", this.value);
    },
    preselect:function() {
      for (var i = 0; i <  this.selected.length; i++) {
        this.value.push({type:this.selected[i]})
      }
    }
  },
  created() {
    db.collection("Users")
      .doc(this.userID)
      .get()
      .then((doc) => {
        this.isSeller = doc.data().seller;
      })
      .then(() => {
        if (this.isSeller) {
          db.collection("bakeriesNew")
            .doc(this.userID)
            .get()
            .then((doc) => {
              var types = doc.data().type;
              this.selected = types
              this.preselect();
            });
        }
      });
  },
};
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>  
