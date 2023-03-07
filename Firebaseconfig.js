// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getApps } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOt2cVEn22Z2dCj5MaotoG2wY3UquWea8",
  authDomain: "chatapp-79277.firebaseapp.com",
  projectId: "chatapp-79277",
  storageBucket: "chatapp-79277.appspot.com",
  messagingSenderId: "968649410385",
  appId: "1:968649410385:web:cae94de8b58917b1a0f570",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
