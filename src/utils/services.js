import {
  browserLocalPersistence,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { redirect } from "react-router";
import { toast } from "sonner";
import { auth } from "../firebase/config";
import axiosFetch from "./axiosFetch";

export const login = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    await setPersistence(auth, browserLocalPersistence);

    // Login in to server
    await axiosFetch.post("users", {
      userId: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
    });

    toast.success("Logged in successfully!");
    return redirect("/");
  } catch (error) {
    console.error(error);
    deleteUser(auth.currentUser);
    signOut(auth);
    return toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return redirect("/");
  } catch (error) {
    console.error(error);
    return toast.error(error.message);
  }
};

export const loadUser = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      },
      reject
    );
  });
};
