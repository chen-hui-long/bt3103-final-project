import { HorizontalBar } from "vue-chartjs";
import database from "../../firebase.js";
import firebase from "@firebase/app";
require("firebase/auth");

export default {
  extends: HorizontalBar,
  data: function() {
    return {
      total_orders: {},
      datacollection: {
        labels: ["0","★" , "★ ★", "★ ★ ★", "★ ★	★ ★", "★ ★ ★ ★ ★"],
        datasets: [
          {
            label: "Total number of ratings",
            backgroundColor: [
              "#C0AD98",
              "#646E78",
              "#8D98A7",
              "#A7A39A",
              "#C1AE8D",
              "#918576",
            ],
            data: [],
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          
          display: true,
          text: "Ratings",
          fontSize: 25,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,

              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    fetchItems() {
      database
        .collection("bakeriesNew")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((doc) => {
            var ratings  = doc.data().ratings
            for (var i = 0; i <= 6; i++) {
                this.datacollection.datasets[0].data.push(ratings[i])
            }
        }).then(() => {
            this.renderChart(this.datacollection, this.options);
        })
    },
  },

  created() {
    this.fetchItems();
  },
};
