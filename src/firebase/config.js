import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAP4Xsbu5CAVNK1P_pJXc1SkPXkZrgElj0",
  authDomain: "twitter-clone-a0129.firebaseapp.com",
  projectId: "twitter-clone-a0129",
  storageBucket: "twitter-clone-a0129.appspot.com",
  messagingSenderId: "95091026125",
  appId: "1:95091026125:web:5aff221939ae7e8c14a184",
  measurementId: "G-HGZK2MW34H"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)