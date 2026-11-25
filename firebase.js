import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzq_djUmMm3fAgb0dTikPHL_5SYyyQZ3U",
  authDomain: "farming-management-syste-57dec.firebaseapp.com",
  projectId: "farming-management-syste-57dec",
  storageBucket: "farming-management-syste-57dec.firebasestorage.app",
  messagingSenderId: "817482238322",
  appId: "1:817482238322:web:5821e9168b0008dc34b5eb",
  measurementId: "G-38E451E217"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);

console.log("Firebase Connected Successfully!");