import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVQTGkHvW16WzJCiKOMfIImyU4DCFwu0A",
  authDomain: "mindway-scheduler.firebaseapp.com",
  projectId: "mindway-scheduler",
  storageBucket: "mindway-scheduler.appspot.com",
  messagingSenderId: "1009688385072",
  appId: "1:1009688385072:web:dd0e230c7caef23888fff5",
  measurementId: "G-NH3HNDFVTD",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
