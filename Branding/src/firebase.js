import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf77flL4hoqXebEy-3xmJe4v_ASpN_JLk",
  authDomain: "branding-54b06.firebaseapp.com",
  projectId: "branding-54b06",
  storageBucket: "branding-54b06.firebasestorage.app", 
  messagingSenderId: "634010103162",
  appId: "1:634010103162:web:9b2744b6983169ebf77ac3",
  measurementId: "G-RR0NDHBB82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app); 
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
