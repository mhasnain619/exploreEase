// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAkCU4ABH_EQb9YaaGQ-_L5MdjLO1MF8og",
    authDomain: "exploreease-e7cb8.firebaseapp.com",
    projectId: "exploreease-e7cb8",
    storageBucket: "exploreease-e7cb8.firebasestorage.app",
    messagingSenderId: "505473389515",
    appId: "1:505473389515:web:71aad2ba04f92ed86c1c4e",
    measurementId: "G-L3CK8TB5PV"
};

// Initialize Firebase
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db }