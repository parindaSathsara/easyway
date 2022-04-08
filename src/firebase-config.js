import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBtsoVPwL848c90tGYfSREoeKgZeLa4EdQ",
    authDomain: "easyway-79a1e.firebaseapp.com",
    projectId: "easyway-79a1e",
    storageBucket: "easyway-79a1e.appspot.com",
    messagingSenderId: "970249746069",
    appId: "1:970249746069:web:2d3521677c45ca325c4d9c",
    measurementId: "G-KPYWS2H247"
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;