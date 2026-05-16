// config_firebase.js

// 1. Soo dejinta qaybaha muhiimka ah ee Firebase SDK v10+
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// 2. Configuration-ka rasmiga ah ee ssm-invest
const firebaseConfig = {
  apiKey: "AIzaSyBb-ImHhrN8XUe0Nihku-ZBSxUDCibaorA",
  authDomain: "ssm-invest.firebaseapp.com",
  projectId: "ssm-invest",
  storageBucket: "ssm-invest.firebasestorage.app",
  messagingSenderId: "1029622095378",
  appId: "1:1029622095378:web:01d95a354b582c0f7902cb",
  measurementId: "G-HS16FERS90"
};

// 3. Bilaabidda (Initialize) Firebase App
const app = initializeApp(firebaseConfig);

// 4. Diyaarinta adeegyada Firestore iyo Auth si loogu isticmaalo boggaga kale
export const db = getFirestore(app);
export const auth = getAuth(app);
