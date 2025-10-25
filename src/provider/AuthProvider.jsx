import React, { createContext, useState, useEffect } from "react";
import app from "../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail, // ✅ import this
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google provider
  const googleProvider = new GoogleAuthProvider();

  // ✅ Create new user (Signup)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Sign in existing user (Login)
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Google Sign-In
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ Update profile (name, photo etc.)
  const updateUser = async (data) => {
    if (!auth.currentUser) return Promise.reject("No user logged in");
    try {
      await updateProfile(auth.currentUser, data);
      setUser({ ...auth.currentUser });
      return Promise.resolve("Profile updated");
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // ✅ Log out user
  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => setUser(null))
      .finally(() => setLoading(false));
  };

  // ✅ Forgot password
  const resetPassword = (email) => {
    if (!email) return Promise.reject("Email is required");
    return sendPasswordResetEmail(auth, email);
  };

  // ✅ Keep track of user state (Firebase observer)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Shared data
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUser,
    resetPassword, // ✅ add resetPassword to context
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
