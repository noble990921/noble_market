import { auth, db } from "@/firebase";
import store from "@/store";

export const loginWithEmail = async (email, password) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    const userDoc = await db.collection("users").doc(user.uid).get();
    const userData = {
      uid: user.uid,
      email: user.email,
      name: userDoc.data().name,
      role: userDoc.data().role,
    };
    await store.dispatch("auth/login", userData);
    return userData;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
    store.dispatch("auth/logout");
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};
