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
        Delivery / Self Pick-up
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
    <ul>
      <li v-for = "bakery in bakeries" v-bind:key="bakery.name" v-show = "visible(bakery)">
        <img v-bind:src = "bakery.ImageURL">
        <p id = "bakery-name">{{bakery.Name}}</p>
        </li>
      </ul>
      </div>
  </div>
</template>

<script>
import database from "../firebase"
export default {
  data() {
    return {
      bakeries: [],       //store all the bakeries details  
      checked: {
        bakery: [], 
        location: [], 
        dietary: [],
        deliver: []
      }
    }
  },
  methods: {
    fetchItems:function() {
      database.collection("bakeries").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.bakeries.push(doc.data());
        })
      })
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
  margin-bottom: 20px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  text-align: center;
  margin: 15px;
  font-size: 20px;
}
img {
  width: 300px;
  height: 300px;
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
</style>