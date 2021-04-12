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
      placeholder="Filter by rating"
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
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: [],
      options: [
        { type: "0 Star Review" },
        { type: "1 Star Review" },
        { type: "2 Stars Review" },
        { type: "3 Stars Review" },
        { type: "4 Stars Review" },
        { type: "5 Stars Review" },
      ],
      selected: [], 
    };
  },

  methods: {
    emit: function () {
      this.$emit("input", this.value);
    },
  },
};
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>  
