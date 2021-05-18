import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyADYr7xZQZCZX1udtC8PP_raJXRPaI-_D4",
  authDomain: "react-firebase-crud-d088f.firebaseapp.com",
  projectId: "react-firebase-crud-d088f",
  storageBucket: "react-firebase-crud-d088f.appspot.com",
  messagingSenderId: "385200238104",
  appId: "1:385200238104:web:363dfd913b5db16e5cdd6d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;