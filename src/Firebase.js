import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBRkc4bGOjDk6PNZ3ixrAdI7HEXPsOKtps",
  authDomain: "react-phone-book-75aff.firebaseapp.com",
  projectId: "react-phone-book-75aff",
  storageBucket: "react-phone-book-75aff.appspot.com",
  messagingSenderId: "767897404011",
  appId: "1:767897404011:web:15970d1d4a1b497ff8e72e",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
