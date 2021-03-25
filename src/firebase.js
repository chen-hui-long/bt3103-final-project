import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXdTfY2mfLkvPyE-0DMU2hElQukh8K9Uc",
    authDomain: "bt3103-g31.firebaseapp.com",
    projectId: "bt3103-g31",
    storageBucket: "bt3103-g31.appspot.com",
    messagingSenderId: "873375348006",
    appId: "1:873375348006:web:7664e9160d07152b1abde7",
    measurementId: "G-1E9RR7EW68"
  };

  firebase.initializeApp(firebaseConfig)
  var database = firebase.firestore()
  export default database;