import firebase from 'firebase';
require('firebase/auth');

const config ={
        apiKey: "AIzaSyCAH-bsg2SjpoY0hzCM4oRt6XA8nuWVFsc",
        authDomain: "j-ssolutions.firebaseapp.com",
        databaseURL: "https://j-ssolutions.firebaseio.com",
        projectId: "j-ssolutions",
        storageBucket: "",
        messagingSenderId: "24275367153",
        appId: "1:24275367153:web:c1bf12d217676d5b"
      
};

const fire = firebase.initializeApp(config);
export default fire;