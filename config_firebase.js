// config_firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBb-ImHhrN8XUe0Nihku-ZBSxUDCibaorA",
  authDomain: "ssm-invest.firebaseapp.com",
  projectId: "ssm-invest",
  storageBucket: "ssm-invest.firebasestorage.app",
  messagingSenderId: "1029622095378",
  appId: "1:1029622095378:web:01d95a354b582c0f7902cb",
  measurementId: "G-HS16FERS90"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
