
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfrqJMozKcGM9cCM6Wq90OKSywbPsg7pc",
    authDomain: "clean-skill-396906.firebaseapp.com",
    projectId: "clean-skill-396906",
    storageBucket: "clean-skill-396906.appspot.com",
    messagingSenderId: "110628976023",
    appId: "1:110628976023:web:edb65815c31b4c1de280d2",
    measurementId: "G-YBP12DJFVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage };