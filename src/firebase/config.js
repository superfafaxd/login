// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKjPlgJuvT-VW3tJEPk6au1Qia9HI60eE",
  authDomain: "react-firebase-279af.firebaseapp.com",
  projectId: "react-firebase-279af",
  storageBucket: "react-firebase-279af.appspot.com",
  messagingSenderId: "1004085863890",
  appId: "1:1004085863890:web:7d2a495e7ee13cc06c140b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore/lite'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBMfyJpqZne2-cTveayJpyjENHJX4jOKgU",
//   authDomain: "react-cursos-94fa1.firebaseapp.com",
//   projectId: "react-cursos-94fa1",
//   storageBucket: "react-cursos-94fa1.appspot.com",
//   messagingSenderId: "975133616591",
//   appId: "1:975133616591:web:5a122179f4e96b0f9bcaba"
// };

// // Initialize Firebase
// export const FirebaseApp = initializeApp(firebaseConfig);
// export const FirebaseAuth = getAuth(FirebaseApp);
// export const FirebaseDB = getFirestore(FirebaseApp);