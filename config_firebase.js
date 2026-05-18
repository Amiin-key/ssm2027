// config_firebase.js (Nooca rasmiga ah ee u furan dhammaan faylashaada HTML)

const firebaseConfig = {
  apiKey: "AIzaSyBb-ImHhrN8XUe0Nihku-ZBSxUDCibaorA",
  authDomain: "ssm-invest.firebaseapp.com",
  projectId: "ssm-invest",
  storageBucket: "ssm-invest.firebasestorage.app",
  messagingSenderId: "1029622095378",
  appId: "1:1029622095378:web:01d95a354b582c0f7902cb",
  measurementId: "G-HS16FERS90"
};

// Hubi haddii aanay horey u jirin App kiciyeen, ka dibna kici
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Ka dhig kuwo laga heli karo fayl walba oo HTML ah
const db = firebase.firestore();
const auth = firebase.auth();
