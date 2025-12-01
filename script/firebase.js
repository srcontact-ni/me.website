// script/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// 🚀 Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDnkEAmYVBVPqPXmCC0fnxPbj8Y2XeDjlw",
  authDomain: "portfolio-dc8fb.firebaseapp.com",
  projectId: "portfolio-dc8fb",
  storageBucket: "portfolio-dc8fb.firebasestorage.app",
  messagingSenderId: "99878190826",
  appId: "1:99878190826:web:1666ffe54fd6fd0648a193"
};

// 🚀 Initialisation
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// 🚀 Fonction pour enregistrer un message
export async function saveMessage(data) {
  try {
    await addDoc(collection(db, "messages"), data);
    return { success: true };
  } catch (error) {
    console.error("Erreur Firebase :", error);
    return { success: false, error };
  }
}
