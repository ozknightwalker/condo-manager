import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQw9eVM4GAT5nsY923xEKeU5ZrOSajTvA",
  authDomain: "condo-manager-9093f.firebaseapp.com",
  projectId: "condo-manager-9093f",
  storageBucket: "condo-manager-9093f.appspot.com",
  messagingSenderId: "948233703377",
  appId: "1:948233703377:web:21882b69c05ece1ea85af0",
  measurementId: "G-EN9PJL1421",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
getAnalytics(firebaseApp);

export const auth = getAuth(firebaseApp);

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return await firebase.auth().signInWithPopup(provider)
    .catch(error => {
      console.error("Google Sign-In error:", error.message)
    });
};

export default firebaseApp;
