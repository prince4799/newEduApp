// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVCGQGPjS02WN-cWQzSaNPRZqp-9EcKRM",
  authDomain: "edufit-42c81.firebaseapp.com",
  projectId: "edufit-42c81",
  storageBucket: "edufit-42c81.appspot.com",
  messagingSenderId: "819405645865",
  appId: "1:819405645865:web:65cefe89415d6b08259438",
  measurementId: "G-0TX25LH54F"
};

"chmod -R 775 android" : command for ./gradlew spawn eaccess error

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);