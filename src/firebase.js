import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDr0CtGyHZm1BlY2F9DGvR2LxM6rXO7WbE",
  authDomain: "linkedin-clone-62af2.firebaseapp.com",
  projectId: "linkedin-clone-62af2",
  storageBucket: "linkedin-clone-62af2.appspot.com",
  messagingSenderId: "776306614834",
  appId: "1:776306614834:web:d2352565a70df5b61fd22b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }