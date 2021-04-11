<template>
  <div>
    <apexchart width="500" type="bar" :options="options" :series="series">
    </apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import firebase from "@firebase/app";
require("firebase/auth");
import db from "../../firebase.js";
export default {
  components: {
    apexchart: VueApexCharts,
  },

  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            "0", 
            "1",
            "2", 
            "3", 
            "4", 
            "5"
          ],
        },
      },
      series: [
        {
          name: "Rating",
          data: [1, 1, ],
        },
      ],
    };
  },

  methods: {
      fetchItems() {
          db.collection("bakeriesNew").doc(firebase.auth().currentUser.uid).get().then((doc) => {
              for (var i = 0; i < 5; i++) {
                  this.series[0].data.push(doc.data().ratings[i])
                  console.log(this.series[0].data)
              }
          }).then(() => {
              console.log("done")
          })
      }
  }, 

  created() {
      this.fetchItems();
  }
};
</script>