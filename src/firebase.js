import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAf77flL4hoqXebEy-3xmJe4v_ASpN_JLk",
  authDomain: "branding-54b06.firebaseapp.com",
  projectId: "branding-54b06",
  storageBucket: "branding-54b06.firebasestorage.app",
  messagingSenderId: "634010103162",
  appId: "1:634010103162:web:9b2744b6983169ebf77ac3",
  measurementId: "G-RR0NDHBB82"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
let analyticsInstance = null;
try {
  analyticsInstance = getAnalytics(app);
} catch (error) {
  console.warn("Firebase Analytics 초기화 건너뜀:", error?.message || error);
}
export const analytics = analyticsInstance;
export const googleProvider = new GoogleAuthProvider();
