import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAnL_Wh8LKkEtOMt8CZ_y574xKi6eyISMc",
  authDomain: "todo-app-a3df6.firebaseapp.com",
  databaseURL: "https://todo-app-a3df6.firebaseio.com",
  projectId: "todo-app-a3df6",
  storageBucket: "todo-app-a3df6.appspot.com",
  messagingSenderId: "474382227345",
  appId: "1:474382227345:web:7793cc3bcfb7e1b73e2c30",
  measurementId: "G-H7SP1Z040L",
});

const db = firebaseApp.firestore();

export default db;
