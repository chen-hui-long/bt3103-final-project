<template>
  <div class="parent">
    <div class="filter-side">
      <h2>Filter by:</h2>
      <hr />
      <div class="filter-header">
        Bakery Goods
        <button type="button" class="collapsible-f1" v-on:click="onClickf1">
          +
        </button>
      </div>
      <div class="f1">
        <form>
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Breads"
              id="Breads"
              v-model="checked.bakery"
            />Breads</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Brownies"
              id="Brownies"
              v-model="checked.bakery"
            />Brownies</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Cakes"
              id="Cakes"
              v-model="checked.bakery"
            />Cakes</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Cheesecakes"
              id="Cheesecakes"
              v-model="checked.bakery"
            />Cheesecakes</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Cookies & Biscuits"
              id="Cookies & Biscuits"
              v-model="checked.bakery"
            />Cookies & Biscuits </label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Chocolate Confections"
              id="Chocolate Confections"
              v-model="checked.bakery"
            />Chocolate Confections</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Cupcakes & Muffins"
              id="Cupcakes & Muffins"
              v-model="checked.bakery"
            />Cupcakes & Muffins</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Donuts"
              id="Donuts"
              v-model="checked.bakery"
            />Donuts</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Festive Baked Goods"
              id="Festive Baked Goods"
              v-model="checked.bakery"
            />Festive Baked Goods</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Macarons"
              id="Macarons"
              v-model="checked.bakery"
            />Macarons</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Pastries"
              id="Pastries"
              v-model="checked.bakery"
            />Pastries</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Pies & Tarts"
              id="Pies & Tarts"
              v-model="checked.bakery"
            />Pies & Tarts</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Traditional Desserts"
              id="Traditional Desserts"
              v-model="checked.bakery"
            />Traditional Desserts</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-bakery-goods"
              value="Others"
              id="Others"
              v-model="checked.bakery"
            />Others</label
          ><br />
        </form>
      </div>
      <hr />
      <div class="filter-header">
        Locations
        <button type="button" class="collapsible-f2" v-on:click="onClickf2">
          +
        </button>
      </div>
      <div class="f2">
        <form>
          <label
            ><input
              type="checkbox"
              name="fl-locations"
              value="Central"
              id="Central"
              v-model="checked.location"
            />Central</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-locations"
              value="East"
              id="East"
              v-model="checked.location"
            />East</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-locations"
              value="North"
              id="North"
              v-model="checked.location"
            />North</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-locations"
              value="South"
              id="South"
              v-model="checked.location"
            />South</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-locations"
              value="West"
              id="West"
              v-model="checked.location"
            />West</label
          ><br />
        </form>
      </div>
      <hr />
      <div class="filter-header">
        Dietary Type
        <button type="button" class="collapsible-f3" v-on:click="onClickf3">
          +
        </button>
      </div>
      <div class="f3">
        <form>
          <label
            ><input
              type="checkbox"
              name="fl-dietary"
              value="Halal"
              id="Halal"
              v-model="checked.dietary"
            />Halal</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-dietary"
              value="Keto"
              id="Keto"
              v-model="checked.dietary"
            />Keto</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-dietary"
              value="Gluten-Free"
              id="Gluten-Free"
              v-model="checked.dietary"
            />Gluten-Free</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-dietary"
              value="Vegan"
              id="Vegan"
              v-model="checked.dietary"
            />Vegan</label
          ><br />
        </form>
      </div>
      <hr />
      <div class="filter-header">
        Delivery / <br />Self Pick-up
        <button type="button" class="collapsible-f4" v-on:click="onClickf4">
          +
        </button>
      </div>
      <div class="f4">
        <form>
          <label
            ><input
              type="checkbox"
              name="fl-delivery-pickup"
              value="Delivery"
              id="Delivery"
              v-model="checked.deliver"
            />Delivery</label
          ><br />
          <label
            ><input
              type="checkbox"
              name="fl-delivery-pickup"
              value="Self Pick-Up"
              id="Self Pick-Up"
              v-model="checked.deliver"
            />Self Pick-up</label
          ><br />
        </form>
      </div>
    </div>

    <div class="content-side">
      <div class="search-sort">
        <input
          id="search_bar"
          type="text"
          v-model="search_filter"
          placeholder="Search by keyword!"
        />
        <span id="search-icon">&#8981;</span>
        <div id="sorting">
          <select id="sort" v-model="sort_by">
            <option value="A-Z" selected>A-Z</option>
            <option value="ratings_ascending">Ratings (Ascending)</option>
            <option value="ratings_descending">Ratings (Descending)</option>
          </select>
        </div>
      </div>
      <hr />
      <div id="loading" v-if="stillLoading">
        <div class="loader"></div>
      </div>
      <div id="main-content" v-if="loaded">
        <ul>
          <paginate
            name="bakeries"
            :list="search_bakeries"
            :key="search_bakeries"
            class="paginate-list"
            :per="12"
          >
            <li
              v-for="bakery in paginated('bakeries')"
              v-bind:key="bakery[1].name"
            >
              <button class="bakery-image-btn" v-on:click="route">
                <img v-bind:src="bakery[1].images[0]" v-bind:id="bakery[0]" />
              </button>
              <p id="bakery-name">{{ bakery[1].shop_name }}</p>
              <p id="bakery-rating">
                <star-rating
                  v-bind:read-only="true"
                  v-model="bakery[2]"
                  v-bind:increment="0.1"
                  v-bind:show-rating="false"
                  v-bind:star-size="12"
                  border-color="black"
                  v-bind:border-width="2"
                  v-bind:rounded-corners="true"
                  inactive-color="white"
                  active-color="black"
                ></star-rating>
              </p>
            </li>
          </paginate>
        </ul>
        <div id="page-number">
          <paginate-links
            for="bakeries"
            :show-step-links="true"
          ></paginate-links>
        </div>
      </div>

      <!-- OLD
      <ul>
        <li
          v-for="bakery in search_bakeries"
          v-bind:key="bakery[1].name"
          v-show="visible(bakery[1])"
        >
          <button class="bakery-image-btn" v-on:click="route">
            <img v-bind:src="bakery[1].images[0]" v-bind:id="bakery[0]" />
          </button>
          <p id="bakery-name">{{ bakery[1].shop_name }}</p>
          <p id="bakery-rating">
            <star-rating
              v-bind:read-only="true"
              v-model="bakery[2]"
              v-bind:increment="0.1"
              v-bind:show-rating="false"
              v-bind:star-size="12"
              border-color="black"
              v-bind:border-width="2"
              v-bind:rounded-corners="true"
              inactive-color="white"
              active-color="black"
            ></star-rating>
          </p>
        </li>
      </ul>
      -->
      <!--
      <div class="pagination">
        <a href="#">&laquo;</a>
        <a class="active" href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">...</a>
        <a href="#">&raquo;</a>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import database from "../firebase";
import StarRating from "vue-star-rating";
export default {
  components: {
    "star-rating": StarRating,
  },
  data() {
    return {
      bakeries: [], //store all the bakeries details
      filtered_bakeries: [],
      checked: {
        bakery: [],
        location: [],
        dietary: [],
        deliver: [],
      },
      search_filter: "",
      sort_by: "A-Z",
      paginate: ["bakeries"],
      loaded: false,
      stillLoading: true,
    };
  },
  methods: {
    fetchItems: function () {
      database
        .collection("bakeriesNew")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            var avg_rating = this.calAvgRating(
              doc.data().ratings,
              doc.data().total_ratings_by_users
            );
            this.bakeries.push([doc.id, doc.data(), avg_rating]);
          });
        })
        .then(() => {
          this.stillLoading = false;
          this.loaded = true;
        });
    },
    calAvgRating: function (rating, total_ratings) {
      var total_rating =
        rating[0] * 0 +
        rating[1] * 1 +
        rating[2] * 2 +
        rating[3] * 3 +
        rating[4] * 4 +
        rating[5] * 5;
      if (total_ratings == 0) {
        return 0;
      } else {
        var avg = total_rating / total_ratings;
        return Math.round(avg * 10) / 10;
      }
    },

    onClickf1: function () {
      var x = document.getElementsByClassName("f1")[0];
      var sym = document.getElementsByClassName("collapsible-f1")[0];
      if (x.style.display === "") {
        x.style.display = "block";
        sym.innerHTML = "-";
      } else {
        x.style.display = "";
        sym.innerHTML = "+";
      }
    },
    onClickf2: function () {
      var x = document.getElementsByClassName("f2")[0];
      var sym = document.getElementsByClassName("collapsible-f2")[0];
      if (x.style.display === "") {
        x.style.display = "block";
        sym.innerHTML = "-";
      } else {
        x.style.display = "";
        sym.innerHTML = "+";
      }
    },
    onClickf3: function () {
      var x = document.getElementsByClassName("f3")[0];
      var sym = document.getElementsByClassName("collapsible-f3")[0];
      if (x.style.display === "") {
        x.style.display = "block";
        sym.innerHTML = "-";
      } else {
        x.style.display = "";
        sym.innerHTML = "+";
      }
    },
    onClickf4: function () {
      var x = document.getElementsByClassName("f4")[0];
      var sym = document.getElementsByClassName("collapsible-f4")[0];
      if (x.style.display === "") {
        x.style.display = "block";
        sym.innerHTML = "-";
      } else {
        x.style.display = "";
        sym.innerHTML = "+";
      }
    },
    visible: function (bakery) {
      //no checked box
      if (this.checked.bakery.length == 0) {
        var curr_bak_boolean = true;
      } else {
        curr_bak_boolean = this.check_bakery(bakery.type); //location filter
      }
      //location
      if (this.checked.location.length == 0) {
        var curr_loc_boolean = true;
      } else {
        curr_loc_boolean = this.check_location(bakery.location); //location filter
      }
      //diet
      if (this.checked.dietary.length == 0) {
        var curr_diet_boolean = true;
      } else {
        curr_diet_boolean = this.check_diet(bakery.dietary); //diet filter
      }
      //delivery
      if (this.checked.deliver.length == 0) {
        var curr_del_boolean = true;
      } else {
        curr_del_boolean = this.check_deliver(bakery.deal_options); //delivery
      }
      return (
        curr_loc_boolean &&
        curr_del_boolean &&
        curr_diet_boolean &&
        curr_bak_boolean
      );
    },
    check_bakery: function (bakes) {
      for (var i = 0; i < bakes.length; i++) {
        //console.log(bakes[i])
        if (this.checked.bakery.includes(bakes[i])) {
          return true;
        }
      }
      return false;
    },

    check_location: function (location) {
      for (var i = 0; i < location.length; i++) {
        if (this.checked.location.includes(location[i])) {
          return true;
        }
      }
      return false;
    },
    check_deliver: function (delivery) {
      if (delivery == undefined) {
        return false;
      } else {
        for (var i = 0; i < delivery.length; i++) {
          console.log(delivery[i]);
          if (this.checked.deliver.includes(delivery[i])) {
            return true;
          }
        }
      }
      return false;
    },
    check_diet: function (diet) {
      if (diet == undefined) {
        return false;
      } else {
        for (var i = 0; i < diet.length; i++) {
          console.log(diet[i]);
          if (this.checked.dietary.includes(diet[i])) {
            return true;
          }
        }
        return false;
      }
    },
    route: function (event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({ path: "/product", query: { id: doc_id } });
    },
  },
  computed: {
    search_bakeries: function () {
      var search = this.search_filter.trim().toLowerCase();
      var curr_filtered_bakeries = this.bakeries.filter((bakery) => {
        return bakery[1].shop_name.toLowerCase().includes(search);
      });
      //console.log(curr_filtered_bakeries);
      //new
      var final_filtered_bakeries = [];
      for (var i = 0; i < curr_filtered_bakeries.length; i++) {
        if (this.visible(curr_filtered_bakeries[i][1])) {
          final_filtered_bakeries.push(curr_filtered_bakeries[i]);
        }
      }
      //
      if (this.sort_by == "A-Z") {
        final_filtered_bakeries.sort(function (a, b) {
          if (a[1].shop_name < b[1].shop_name) {
            return -1;
          } else {
            return 1;
          }
        });
      } else if (this.sort_by == "ratings_ascending") {
        final_filtered_bakeries.sort(function (a, b) {
          return a[2] - b[2];
        });
      } else if (this.sort_by == "ratings_descending") {
        final_filtered_bakeries.sort(function (a, b) {
          return b[2] - a[2];
        });
      }
      return final_filtered_bakeries;
    },
  },

  created() {
    this.fetchItems();
  },
};
</script>


<style scoped>
.parent {
  display: flex;
  margin-top: 20px;
}
.filter-side {
  flex: 0 0 22%;
  padding-left: 80px;
  margin-top: 100px;
  margin-bottom: 20px;
}

hr {
  border: none;
  height: 2px;
  background-color: #bbbbbb75;
}
ul {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 0;
  text-align: center;
  margin: 10px;
  font-size: 20px;
}
img {
  width: 280px;
  height: 280px;
  cursor: pointer;
  border: 2px solid #dcdcdc45;
  border-radius: 5px;
}
.f1 {
  display: none;
}
.f2 {
  display: none;
}
.f3 {
  display: none;
}
.f4 {
  display: none;
}
.collapsible-f1 {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: 0;
}
.collapsible-f2 {
  float: right;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: 0;
}
.collapsible-f3 {
  float: right;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: 0;
}
.collapsible-f4 {
  float: right;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: 0;
}
.filter-header {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}
input {
  /*style for checkbox*/
  margin-right: 10px;
}

.content-side {
  flex: 0 0 78%;
  padding-right: 80px;
  padding-left: 50px;
}

.bakery-image-btn {
  background-color: transparent;
  padding: 0 0 0 0;
  border: none;
}
#bakery-name {
  margin-bottom: 0;
}
#bakery-rating {
  align-content: center;
}

div.vue-star-rating {
  display: flex;
  justify-content: center;
}
.search-sort {
  display: flex;
  width: 100%;
  height: 45px;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 3%;
  padding-right: 3%;
  align-items: center;
}

#search_bar {
  border-radius: 15px;
  width: 60%;
  height: 80%;
  text-indent: 40px;
  font-size: 16px;
  outline-style: none;
  box-shadow: none;
  border: 2px solid #bbbbbb;
}

#search-icon {
  position: absolute;
  margin-left: 10px;
  transform: rotate(270deg);
  font-size: 50px;
  color: rgba(7, 7, 7, 0.39);
}
#sorting {
  font-size: 18px;
  font-weight: bold;
}
#sort {
  border: none;
  outline-style: none;
  box-shadow: none;
  cursor: pointer;
}

/*
.pagination {
  display: inline-block;
}
*/
/*
.pagination a {
  border: 1px solid #ddd;
  border-radius: 50px;
  background-color: #e5e5e5b4;
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  margin: 0 4px;
  font-weight: bold;
}

.pagination a.active {
  background-color: #898989d1;
  color: black;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
*/

#bakery-name {
  margin-bottom: 0;
}
#bakery-rating {
  margin: 0 0 0 0;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #e3dddf; /* Blue */
  border-radius: 50%;
  width: 250px;
  height: 250px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#loading {
  display: flex;
  justify-content: space-evenly;
  margin-top:120px;
}
</style>


<style>
/*FOR PAGINATION THIS IS NOT SCOPED */
ul.paginate-links a {
  border: 1px solid #ddd;
  border-radius: 50px;
  background-color: #e5e5e5b4;
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  margin: 0 4px;
  font-weight: bold;
}
ul.paginate-links a:hover {
  cursor: pointer;
}

li.number.active a {
  background-color: #e3dddf;
}

</style>
