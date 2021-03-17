<template>
   <div>
    <header>
        <h1><router-link to="/" exact>EATSY</router-link></h1>

        <div class="searchBar">
            <input type = "text" placeholder="Search by keyword!">
            <img src = "@/assets/search.png">
        </div>
        
        <div class = "left">
        <h3><router-link to="/login" exact>Login </router-link></h3>
        <router-link to="/favorite" exact><img src = "@/assets/favourites.png"></router-link>
        </div>

    </header>
    </div> 
  
</template>

<script>
export default {
  
  data(){
    return{
        }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 100px;
  background: #E3DDDF;
  font-weight:normal;
  position: sticky;
  top: 0;
}

h1{
    color:black;
    display: inline-block;
    float: left;
    padding: 0 80px;
    font-size: 40px;
}

.searchBar{
    display: inline-block;
    padding:30px 6vw;
}
.searchBar input{
    width: 45vw; 
    height: 40px;
    font-size: 18px;
    text-indent: 15px;
    border-radius: 15px;
    border: 2px solid #D5D5D5;
}

.searchBar img {
    position: absolute;
    top:25px;
    right:30vw;
    width: 30px;
    height: 30px;
    padding:12px 0px;
}

.left{
    display:flex;
    float:right;
    padding:20px 100px 0px 0px;

}
h3{
    color:black;
    font-size:20px;
}

img{
  width: 26px;
  height: 22px;
  padding-left: 100px;
  padding-top: 20px;
}

a{
    color: black;
    text-decoration: none;
}

</style>