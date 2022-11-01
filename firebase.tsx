import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_DB_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_DB_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_DB_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_DB_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_DB_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_DB_APPID,
  measurementId: process.env.NEXT_PUBLIC_DB_MEASUREMENTID,
};

// check if firebase instance is already up, if not initialize app;
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = app.auth();

//use google account as authentication
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
