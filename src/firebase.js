import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA6U238sA868KzlJu63gbDBD9i3zv0jfsw",
  authDomain: "noblemarket-30d96.firebaseapp.com",
  projectId: "noblemarket-30d96",
  storageBucket: "noblemarket-30d96.firebasestorage.app",
  messagingSenderId: "861313430404",
  appId: "1:861313430404:web:f3fae70bca86f9cc8523d1",
  measurementId: "G-2SK2YM2D98"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;