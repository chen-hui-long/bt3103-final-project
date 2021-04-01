<template>
  <div>
    <multiselect 
      @input = "emit"
      v-model="value"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="What type of bakery are you selling?"
      label="type"
      track-by="type"
      :preselect-first="false"
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
  methods: {
    emit: function() {
      this.$emit("input", this.value);
    }
  }
};
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>  
