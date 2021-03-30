<template>
  <div>
    <multiselect
      v-model="value"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Pick some"
      label="type"
      track-by="type"
      :preselect-first="true"
    >
      <template slot="selection" slot-scope="{ values, search, isOpen }"
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
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: [],
      options: [
        {type: "Breads"},
        {type: "Brownies"},
        {type: "Cakes"},
        {type: "Cheesecakes"},
        {type: "Cookies & Biscuits"},
        {type: "Chocolate Confections"},
        {type: "Cupcakes & Muffins"},
        {type: "Donuts"}, 
        {type: "Macarons"}, 
        {type: "Pastries"}, 
        {type: "Traditional Desserts"}, 
        {type: "Others"}, 
      ],
    };
  },
};
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>  
