// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX0usuJ3EWCcq4cCMnxCXj1lUR0Rq-NEg",
  authDomain: "nutrimind-ai-f761b.firebaseapp.com",
  projectId: "nutrimind-ai-f761b",
  storageBucket: "nutrimind-ai-f761b.firebasestorage.app",
  messagingSenderId: "127155053016",
  appId: "1:127155053016:web:49e93caa02ba0c7532d2ad",
  measurementId: "G-YZJV70V0S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
