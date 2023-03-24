// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0RpU6k9WNJ3Ay3yPFOnEcTHb2D7L45uE",
  authDomain: "pruebatecnicatugerente.firebaseapp.com",
  projectId: "pruebatecnicatugerente",
  storageBucket: "pruebatecnicatugerente.appspot.com",
  messagingSenderId: "508022164232",
  appId: "1:508022164232:web:2c925d7df0135f4eafbabd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);