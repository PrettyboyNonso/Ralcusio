import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAVdfzWYnNbKMOBcXYH-2LwkxMOD13bd8s",
  authDomain: "ralcusio.firebaseapp.com",
  projectId: "ralcusio",
  storageBucket: "ralcusio.appspot.com",
  messagingSenderId: "775202182259",
  appId: "1:775202182259:web:af2a4125dcea68a2e00606",
};

const myApp = initializeApp(firebaseConfig);
export const database = getFirestore(myApp);
export const auth = getAuth(myApp);
export const storage = getStorage(myApp);
