import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDCC92_d2HS7zpG2_qY8mSfxP6V8Ck03Ag",
  authDomain: "crud-2fb95.firebaseapp.com",
  projectId: "crud-2fb95",
  storageBucket: "crud-2fb95.appspot.com",
  messagingSenderId: "668305175019",
  appId: "1:668305175019:web:2b260c60561bd739a769ae"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;