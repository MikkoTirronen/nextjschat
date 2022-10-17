import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABVrj1xcv14u6QzlCtl3Grazoz6WhqBDM",
  authDomain: "whatsappchat-3d772.firebaseapp.com",
  projectId: "whatsappchat-3d772",
  storageBucket: "whatsappchat-3d772.appspot.com",
  messagingSenderId: "568875909126",
  appId: "1:568875909126:web:dcd99a76b2a06ae743c387",
  measurementId: "G-6TMGHP7BL3",
};

// check if firebase instance is already up, if not initialize app;
const app = !firebase.app.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();

//use google account as authentication
const provider = new firebase.auth.GoogleAuthProvider();

export  {db, auth,provider};
