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
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#ddeb1c",
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
