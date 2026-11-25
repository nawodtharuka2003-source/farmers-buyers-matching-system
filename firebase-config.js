import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBzq_djUmMm3fAgb0dTikPHL_5SYyyQZ3U",
    authDomain: "farming-management-syste-57dec.firebaseapp.com",
    projectId: "farming-management-syste-57dec",
    storageBucket: "farming-management-syste-57dec.firebasestorage.app",
    messagingSenderId: "817482238322",
    appId: "1:817482238322:web:5821e9168b0008dc34b5eb",
    measurementId: "G-38E451E217"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const aiAssistantUrl = "https://us-central1-farming-management-syste-57dec.cloudfunctions.net/croplinkAssistant";
