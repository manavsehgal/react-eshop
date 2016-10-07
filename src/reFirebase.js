const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

const config = {
  apiKey: "AIzaSyCekbJrfuOoErE6bF5auczgYnq5Hs32anQ",
  authDomain: "reacteshop.firebaseapp.com",
  databaseURL: "https://reacteshop.firebaseio.com",
  storageBucket: "reacteshop.appspot.com",
  messagingSenderId: "1016974227748"
};

// As reFirebase is included within multiple components,
// check to see if initializeApp is already called,
// firebase.apps array contains all initialized apps
if(firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

const reFirebase = firebase;

export const reDatabase = firebase.database();
export const reStorage = firebase.storage();
export default reFirebase;
