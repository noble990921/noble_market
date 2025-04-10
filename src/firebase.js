import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB53R8HSP8wi8HgOEcsT5UBpJmtf_u82qY",
  authDomain: "shopingmall-c5b43.firebaseapp.com",
  projectId: "shopingmall-c5b43",
  storageBucket: "shopingmall-c5b43.appspot.com",
  messagingSenderId: "1018617536608",
  appId: "1:1018617536608:web:a84a04d91a8adb4d576305",
  measurementId: "G-FB8CJBXBRH",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;