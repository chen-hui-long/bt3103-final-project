import { Doughnut } from "vue-chartjs";
import database from "../../firebase.js";
import firebase from "@firebase/app";
require("firebase/auth");

export default {
  extends: Doughnut,
  data: function() {
    return {
      total_orders: {},
      datacollection: {
        labels: ["0", "★", "★ ★", "★ ★ ★", "★ ★	★ ★", "★ ★ ★ ★ ★"],
        datasets: [
          {
            label: "Total number of ratings",
            backgroundColor: [
              "#DC8665",
              "#138086",
              "#534666",
              "#CD7672",
              "#EEB462",
              "#f67e7d",
            ],
            data: [],
          },
        ],
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "Ratings",
          fontSize: 25,
        },
        responsive: true,
        maintainAspectRatio: false,
        onClick: this.clicked, 
        onHover: (event, chartElement) => {
          event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      }
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
          var ratings = doc.data().ratings;
          for (var i = 0; i <= 6; i++) {
            this.datacollection.datasets[0].data.push(ratings[i]);
          }
        })
        .then(() => {
          this.renderChart(this.datacollection, this.options);
        });
    },

    clicked(pointer, event) {
      console.log(pointer)
      var index = event[0]._index
      if (index == 0) {
        if (this.datacollection.datasets[0].backgroundColor[0] == "#DC8665") {
          console.log("yo")
          this.$set(this.datacollection.datasets[0].backgroundColor, index, "black");
          this.datacollection.datasets[0].backgroundColor[0] = "black"
        } else {
          this.datacollection.datasets[0].backgroundColor[0] = "#DC8665"
        }
      }
      this.$emit("on-receive", {
        index: event[0]._index
      })
    }

  },

  created() {
    this.fetchItems();
  },
};
