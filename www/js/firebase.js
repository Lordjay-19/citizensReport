// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOeAOalt9rse5SAX1iwqIByEgqphSKI1E",
  authDomain: "citizensreport-1905.firebaseapp.com",
  projectId: "citizensreport-1905",
  storageBucket: "citizensreport-1905.firebasestorage.app",
  messagingSenderId: "624930538936",
  appId: "1:624930538936:web:29967a5785403baa56bb4d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var db = firebase.firestore();
