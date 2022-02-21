import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

const firebaseConfig = JSON.parse(Deno.env.get("FIREBASE_CONFIG"));
const firebaseApp = initializeApp(firebaseConfig, "example");

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
export { collection, doc, getDocs, setDoc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
