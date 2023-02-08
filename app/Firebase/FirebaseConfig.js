// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ51x-rfze40HkWptG57QiQLca7SdrnpA",
  authDomain: "eduapp-fc3dc.firebaseapp.com",
  databaseURL: "https://eduapp-fc3dc-default-rtdb.firebaseio.com",
  projectId: "eduapp-fc3dc",
  storageBucket: "eduapp-fc3dc.appspot.com",
  messagingSenderId: "592476467897",
  appId: "1:592476467897:web:50439d0e27ae9d80652168"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };