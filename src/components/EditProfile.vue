<template> 
    <div class="edit">
        
        <div class="links">
            <router-link id="home" to='/home'>Home / </router-link> 
            <router-link id="profile" to='/profile'>Profile / </router-link>
            <router-link id="edit" to='/editProfile'>Edit</router-link>
        </div>

        <form action="/action_page.php">
            <label for="image">Select image: </label>
            <input name="image" type="file" accept="image/*" v-on:change="changeImage">


            <label for="fname">First name: </label>
            <input name="fname" type="text" v-model="fname"/>

            <label for="lname">Last name: </label>
            <input name="lname" type="text" v-model="lname"/>

            <input type="submit" on:click.prevent="update()" value="Update">

        </form>

    </div>


</template>

<script> 
import db from '../firebase.js'

export default{
    data(){
        return{
            fname: "",
            lname: "",
            image: "",
        }
    },

    props:['userID'],

    methods: {
        // not sure about the image upload ans storage
        /*
        changeImage(e){
            this.image = firebase.storage().ref().child(e) 
        },
        */
        
        fetchOrigin(){
            db.collection("Users").doc(this.userID).get().then(snapshot => {
                const data = snapshot.data()
                this.fname = data.fname
                this.lname = data.lname
                this.image = data.image
            })
        },

        update(){
            db.collection("Users").doc(this.userID).update({
                'fname':this.fname, 'lname':this.lname, 'image':this.image
            }).then(() => alert("Update successfully!"))
        }
    },

    created(){
        this.fetchOrigin()
    }
}
</script>

<style scoped>
.links {
  text-align: left;
  padding: 10px;
}

#home {
  color: gray;
}

#profile {
  color: gray;
}

form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  margin: 0 auto 100px;
  padding: 45px;
}
form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border-radius: 5px;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

form label {
  float: left;
}
</style>

