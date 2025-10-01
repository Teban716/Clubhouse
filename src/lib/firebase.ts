import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtlzaWoutySezgZpvvxbu8gti6zaIvY_8",
  authDomain: "clubhouse-e5931.firebaseapp.com",
  projectId: "clubhouse-e5931",
  storageBucket: "clubhouse-e5931.firebasestorage.app",
  messagingSenderId: "551097299687",
  appId: "1:551097299687:web:17fad174f755af81ff2842",
  measurementId: "G-96NK44KH1K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
