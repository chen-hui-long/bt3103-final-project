<template>
  <div class = "parent">
    <div class = "filter-side">
      <h2> Filter By:</h2>
      <hr>
      <div class = "filter-header"> 
        Bakery Goods
          <button type = "button" class = "collapsible-f1" v-on:click ="onClickf1">+</button>
      </div>
      <div class = "f1">
      <form>
        <label><input type="checkbox" name="fl-bakery-goods" value="Breads" id="Breads" v-model="checked.bakery"/>Breads</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Brownies" id="Brownies" v-model="checked.bakery" />Brownies</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Cakes" id="Cakes" v-model="checked.bakery" />Cakes</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Cheesecakes" id="Cheesecakes" v-model="checked.bakery" />Cheesecakes</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Cookies & Biscuits" id="Cookies & Biscuits" v-model="checked.bakery" />Cookies & Biscuits </label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Chocolate Confections" id="Chocolate Confections"  v-model="checked.bakery"/>Chocolate Confections</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Cupcakes & Muffins" id="Cupcakes & Muffins" v-model="checked.bakery" />Cupcakes & Muffins</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Donuts" id="Donuts" v-model="checked.bakery" />Donuts</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Macarons" id="Macarons" v-model="checked.bakery" />Macarons</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Pastries" id="Pastries" v-model="checked.bakery" />Pastries</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Pies & Tarts" id="Pies & Tarts" v-model="checked.bakery" />Pies & Tarts</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Traditional Desserts" id="Traditional Desserts" v-model="checked.bakery" />Traditional Desserts</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Others" id="Others" v-model="checked.bakery"/>Others</label><br>
        </form>
      </div>
      <hr>
      <div class = "filter-header">
        Locations
        <button type = "button" class = "collapsible-f2" v-on:click ="onClickf2">+</button>
      </div>
      <div class = "f2">
        <form>
        <label><input type="checkbox" name="fl-locations" value="Central" id="Central" v-model="checked.location" />Central</label><br>
        <label><input type="checkbox" name="fl-locations" value="East" id="East" v-model="checked.location "/>East</label><br>
        <label><input type="checkbox" name="fl-locations" value="North" id="North" v-model="checked.location" />North</label><br>
        <label><input type="checkbox" name="fl-locations" value="South" id="South" v-model="checked.location" />South</label><br>
        <label><input type="checkbox" name="fl-locations" value="West" id="West" v-model="checked.location" />West</label><br>
        </form>
      </div>
      <hr>
      <div class = "filter-header">
        Dietary Type
      <button type = "button" class = "collapsible-f3" v-on:click ="onClickf3">+</button>
      </div>
      <div class = "f3">
        <form>
        <label><input type="checkbox" name="fl-dietary" value="Halal" id="Halal" v-model ="checked.dietary" />Halal</label><br>
        <label><input type="checkbox" name="fl-dietary" value="Keto" id="Keto" v-model ="checked.dietary"/>Keto</label><br>
        <label><input type="checkbox" name="fl-dietary" value="Gluten-Free" id="Gluten-Free" v-model ="checked.dietary"/>Gluten-Free</label><br>
        <label><input type="checkbox" name="fl-dietary" value="Vegan" id="Vegan" v-model ="checked.dietary"/>Vegan</label><br>
        </form>
      </div>
      <hr>
      <div class = "filter-header">
        Delivery / <br>Self Pick-up
      <button type = "button" class = "collapsible-f4" v-on:click ="onClickf4">+</button>
      </div>
      <div class = "f4">
        <form>
        <label><input type="checkbox" name="fl-delivery-pickup" value="Delivery" id="Delivery" v-model ="checked.deliver"/>Delivery</label><br>
        <label><input type="checkbox" name="fl-delivery-pickup" value="Self Pick-Up" id="Self Pick-Up" v-model ="checked.deliver" />Self Pick-up</label><br>
        </form>
      </div>
      </div>

      <div class = "content-side">
        <div class = "search-sort">
          <input id = "search_bar" type="text" v-model = "search_filter" placeholder="Search by keyword!" />
          <div id = "sorting">
            Sort by:
            <select id="sort" v-model = "sort_by">
                <option value="A-Z" selected>A-Z</option>
                <option value="ratings_ascending">Ratings (Ascending)</option>
                <option value="ratings_descending">Ratings (Descending)</option>
            </select>
          </div>
        </div>
        <hr>
    <ul>
      <li v-for = "bakery in search_bakeries" v-bind:key="bakery[1].name" v-show = "visible(bakery[1])">
        <button class = "bakery-image-btn" v-on:click ="route"><img v-bind:src = "bakery[1].ImageURL" v-bind:id = "bakery[0]"></button>
        <p id = "bakery-name">{{bakery[1].Name}}</p>
        <p id = "bakery-rating">{{bakery[2]}} ★</p>
        </li>
      </ul>
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
      </div>
  </div>
</template>

<script>
import database from "../firebase"
export default {
  data() {
    return {
      bakeries: [],       //store all the bakeries details  
      filtered_bakeries: [], 
      checked: {
        bakery: [], 
        location: [], 
        dietary: [],
        deliver: []
      }, 
      search_filter: "",
      sort_by: "A-Z"
    }
  },
  methods: {
    fetchItems:function() {
      database.collection("bakeries").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          var avg_rating = this.calAvgRating(doc.data().Rating)
          this.bakeries.push([doc.id, doc.data(), avg_rating]);
        })
      })
    }, 
    calAvgRating:function(rating) {
      var total_rating = rating.One * 1 + rating.Two * 2 + rating.Three * 3 + rating.Four * 4 + rating.Five * 5
      var total_review = rating.One + rating.Two + rating.Three + rating.Four  + rating.Five
      var avg = total_rating / total_review
      return Math.round(avg * 10) / 10
    }, 

    onClickf1:function() {
      var x  = document.getElementsByClassName("f1")[0]
      var sym = document.getElementsByClassName("collapsible-f1")[0]
      if (x.style.display === "") { 
        x.style.display = "block"
        sym.innerHTML = "-"
      } else {
        x.style.display = ""
        sym.innerHTML = "+"
      }
    }, 
    onClickf2:function() {
      var x  = document.getElementsByClassName("f2")[0]
      var sym = document.getElementsByClassName("collapsible-f2")[0]
      if (x.style.display === "") { 
        x.style.display = "block"
        sym.innerHTML = "-"
      } else {
        x.style.display = ""
        sym.innerHTML = "+"
      }
    }, 
    onClickf3:function() {
      var x  = document.getElementsByClassName("f3")[0]
      var sym = document.getElementsByClassName("collapsible-f3")[0]
      if (x.style.display === "") { 
        x.style.display = "block"
        sym.innerHTML = "-"
      } else {
        x.style.display = ""
        sym.innerHTML = "+"
      }
    }, 
    onClickf4:function() {
      var x  = document.getElementsByClassName("f4")[0]
      var sym = document.getElementsByClassName("collapsible-f4")[0]
      if (x.style.display === "") { 
        x.style.display = "block"
        sym.innerHTML = "-"
      } else {
        x.style.display = ""
        sym.innerHTML = "+"
      }
    }, 
    visible: function(bakery) {
      //no checked box 
      if (this.checked.bakery.length == 0) {
      var curr_bak_boolean = true;
      } else {
        curr_bak_boolean = this.check_bakery(bakery.Bakes) //location filter
      }
      //location 
      if (this.checked.location.length == 0) {
        var curr_loc_boolean = true;
      } else {
        curr_loc_boolean = this.check_location(bakery.Location) //location filter
      }
      //diet
      if (this.checked.dietary.length == 0) {
        var curr_diet_boolean = true;
      } else {
        curr_diet_boolean = this.check_diet(bakery.Dietary) //diet filter
      }      
      //delivery
      if (this.checked.deliver.length == 0) {
        var curr_del_boolean = true;
      } else {
        curr_del_boolean = this.check_deliver(bakery.Delivery) //delivery
      }     
      return (curr_loc_boolean && curr_del_boolean && curr_diet_boolean && curr_bak_boolean);
      
    }, 
    check_bakery:function(bakes) {
      for (var i = 0; i < bakes.length; i++) {
        console.log(bakes[i])
        if (this.checked.bakery.includes(bakes[i])) {
          return true;
        }
      }
      return false;
    },
    
    check_location:function(location) {
      if (this.checked.location.includes(location)) {
        return true;
      } else {
        return false;
      }
    }, 
    check_deliver:function(delivery) {
      if (delivery == undefined) {
        return false; 
      } else if (delivery == "Both") {
        return true;
      } else if (this.checked.deliver.includes(delivery)) {
        return true;
      } else {
        return false;
      }
    },
    check_diet:function(diet) {
      if (diet == undefined) {
        return false 
      } else if (this.checked.dietary.includes(diet)) {
        return true 
      } else {
        return false;
      }
    }, 
    route:function(event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({path: "/product", query: {id: doc_id}})
    }
  }, 
  computed: {
    search_bakeries:function() {
      var search = this.search_filter.trim().toLowerCase()
      var curr_filtered_bakeries = this.bakeries.filter((bakery) => {
          return bakery[1].Name.toLowerCase().includes(search);
      })
      if (this.sort_by == "A-Z") {
        curr_filtered_bakeries.sort(function(a, b) {
          return a[1].name - b[1].name
        })
      } else if (this.sort_by == "ratings_ascending") {
        curr_filtered_bakeries.sort(function(a, b) {
          return a[2] - b[2]
        })
      } else if (this.sort_by == "ratings_descending") {
        curr_filtered_bakeries.sort(function(a, b) {
          return b[2] - a[2]
        })
      }
      return curr_filtered_bakeries;
    }
  }, 

  created() {
    this.fetchItems();
  }
  }
</script>


<style scoped>
.parent {
  display: flex;
}
.filter-side {
  flex: 0 0 20%;
  padding-left: 30px;
  margin-top: 100px;
  margin-bottom: 20px;
  
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
  margin: 15px;
  font-size: 20px;
}
img {
  width: 280px;
  height: 280px;
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
  border:none;
}
.collapsible-f2 {
  float:right;
  background-color: transparent;
  border:none;
}
.collapsible-f3 {
  float:right;
  background-color: transparent;
  border:none;
}
.collapsible-f4 {
  float:right;
  background-color: transparent;
  border:none;
}
.filter-header {
  display:flex;
  justify-content: space-between;
  font-size:20px;
}
input { /*style for checkbox*/
  margin-right:10px;
}


.content-side { 
  flex: 0 0 80%;
}

.bakery-image-btn {
  background-color: transparent;
  padding: 0 0 0 0 ;
  border: none;
}
#bakery-name {
  margin-bottom: 0;
}
#bakery-rating {
  margin: 0 0 0 0;
}
.search-sort {
  display:flex;
  width:100%;
  height:45px;
  justify-content: space-between;
  margin-top:10px;
  margin-bottom: 10px;
  padding-left:3%;
  padding-right:3%;
  align-items: center;
}
#search_bar {
  border-radius: 15px;
  width:60%;
  text-indent: 15px;
  font-size: 18px;
  outline-style: none;
  box-shadow: none;
  border: 2px solid #bbbbbb;
}
#sorting {
  font-size: 18px;
}
#sort {
  border:none;
  outline-style: none;
  box-shadow: none;
}

.pagination {
  display: inline-block;

}

.pagination a {
  /*border: 1px solid #ddd;*/
  border-radius:50px;
  background-color:#e5e5e5b4;
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  margin: 0 4px;
  font-weight:bold;
}

.pagination a.active {
  background-color: #898989d1;
  color:black;
}

.pagination a:hover:not(.active) {background-color: #ddd;}


#bakery-name {
  margin-bottom: 0;
}
#bakery-rating {
  margin: 0 0 0 0;
}

.search-sort {
  display:flex;
  width:100%;
  height:45px;
  justify-content: space-between;
  margin-top:10px;
  margin-bottom: 10px;
  padding-left:3%;
  padding-right:3%;
  align-items: center;
}

#search_bar {
  border-radius: 15px;
  width:60%;
  text-indent: 15px;
  font-size: 18px;
  outline-style: none;
  box-shadow: none;
  border: 2px solid #bbbbbb;
}

#sorting {
  font-size: 18px;
}

#sort {
  border:none;
  outline-style: none;
  box-shadow: none;
}
</style>

