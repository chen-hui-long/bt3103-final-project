<template>
  <div class = "parent">
    <div class = "filter-side">
      <h2> Filter By:</h2>
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
    }
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

</style>