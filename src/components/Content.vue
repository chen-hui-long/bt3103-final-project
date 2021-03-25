<template>
  <div class = "parent">
    <div class = "filter-side">
      <h2> Filter By:</h2>
      <button type = "button" class = "collapsible-f1" v-on:click ="onClickf1"> Bakery Goods </button>
      <div class = "f1">
      <form>
        <label><input type="checkbox" name="fl-bakery-goods" value="Breads" id="Breads" />Breads</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Brownies" id="Brownies" />Brownies</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Cakes" id="Cakes" /> Cakes</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Cheesecakes" id="Cheesecakes" />Cheesecakes</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Cookies & Biscuits" id="Cookies & Biscuits" />Cookies & Biscuits </label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Chocolate Confections" id="Chocolate Confections" />Chocolate Confections</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Cupcakes & Muffins" id="Cupcakes & Muffins" />Cupcakes & Muffins</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Donuts" id="Donuts" />Donuts</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Macarons" id="Macarons" />Macarons</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Pastries" id="Pastries" />Pastries</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Pies & Tarts" id="Pies & Tarts" />Pies & Tarts</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Traditional Desserts" id="Traditional Desserts" />Traditional Desserts</label><br>
        <label><input type="checkbox" name="fl-bakery-goods" value="Others" id="Others" />Others</label><br>
        </form>
      </div>
      <button type = "button" class = "collapsible-f2" v-on:click ="onClickf2">Locations </button>
      <div class = "f2">
        <form>
        <label><input type="checkbox" name="fl-locations" value="Central" id="Central" />Central</label><br>
        <label><input type="checkbox" name="fl-locations" value="East" id="East" />East</label><br>
        <label><input type="checkbox" name="fl-locations" value="North" id="North" />North</label><br>
        <label><input type="checkbox" name="fl-locations" value="South" id="South" />South</label><br>
        <label><input type="checkbox" name="fl-locations" value="West" id="West" />West</label><br>
        </form>
      </div>

      <button type = "button" class = "collapsible-f3" v-on:click ="onClickf3">Dietary Type</button>
      <div class = "f3">
        <form>
        <label><input type="checkbox" name="fl-dietary" value="Halal" id="Halal" />Halal</label><br>
        <label><input type="checkbox" name="fl-dietary" value="Keto" id="Keto" />Keto</label><br>
        <label><input type="checkbox" name="fl-dietary" value="Gluten-Free" id="Gluten-Free" />Gluten-Free</label><br>
        <label><input type="checkbox" name="fl-dietary" value="Vegan" id="Vegan" />Vegan</label><br>
        </form>
      </div>

      <button type = "button" class = "collapsible-f4" v-on:click ="onClickf4">Delivery / Self Pick-up </button>
      <div class = "f4">
        <form>
        <label><input type="checkbox" name="fl-delivery-pickup" value="Delivery" id="Delivery" />Delivery</label><br>
        <label><input type="checkbox" name="fl-delivery-pickup" value="Self-Pick-up" id="Self-Pick-up" />Self-Pick-up</label><br>
        </form>
      </div>

      </div>
      <div class = "content-side">
    <ul>
      <li v-for = "bakery in bakeries" v-bind:key="bakery.name">
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
      bakeries: []
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
      console.log(x.style)
      if (x.style.display === "") { 
        x.style.display = "block"
      } else {
        x.style.display = ""
      }
    }, 

    onClickf2:function() {
      var x  = document.getElementsByClassName("f2")[0]
      console.log(x.style)
      if (x.style.display === "") { 
        x.style.display = "block"
      } else {
        x.style.display = ""
      }
    }, 

    onClickf3:function() {
      var x  = document.getElementsByClassName("f3")[0]
      console.log(x.style)
      if (x.style.display === "") { 
        x.style.display = "block"
      } else {
        x.style.display = ""
      }
    }, 

    onClickf4:function() {
      var x  = document.getElementsByClassName("f4")[0]
      console.log(x.style)
      if (x.style.display === "") { 
        x.style.display = "block"
      } else {
        x.style.display = ""
      }
    }, 

  }, 
  created() {
    this.fetchItems();
    console.log(this.bakeries);
  }
  }

</script>


<style scoped>

.parent {
  display: flex;
}

.filter-side {
  flex: 0 0 20%;
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

</style>