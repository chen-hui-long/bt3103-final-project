<template>
  <div>
    <BarChart></BarChart>
  </div>
</template>
 
<script>
import BarChart from './BarChart.vue'

export default {
  components: {
    BarChart
  },

  data: function () {
    return {
      ratings: [],
    };
  },

  methods: {
  },

  created: function () {
  },
};
</script>
 
<style>
</style>