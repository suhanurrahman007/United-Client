// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getAuth
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAOnF3j1ARntCQOMRT44iHORnizo1IHqAg",
    authDomain: "united-e19cb.firebaseapp.com",
    projectId: "united-e19cb",
    storageBucket: "united-e19cb.appspot.com",
    messagingSenderId: "1093234674914",
    appId: "1:1093234674914:web:2af30de044187087d9e2bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export default auth