import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC94GBOaPC0GxnCF_wrci4oWea8VN_C44c",
  authDomain: "noble-df752.firebaseapp.com",
  projectId: "noble-df752",
  storageBucket: "noble-df752.firebasestorage.app",
  messagingSenderId: "398613154754",
  appId: "1:398613154754:web:6eb5fe3e4a1c1fe14e245b",
  measurementId: "G-1JK849DGE0"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;