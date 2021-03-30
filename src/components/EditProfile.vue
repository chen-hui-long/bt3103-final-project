<template> 
    <div class="edit">
        
        <div class="links">
            <router-link id="home" to='/home'>Home / </router-link> 
            <router-link id="profile" to='/profile'>Profile / </router-link>
            <router-link id="edit" to='/editProfile'>Edit</router-link>
        </div>

        <form action="/action_page.php">
            <label for="image">Select image: </label>
            <!-- not sure about the image upload ans storage -->
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
        changeImage(e){
            this.image = firebase.storage().ref().child(e) 
        },
        
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

