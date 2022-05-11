import React, { createContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const firestore = getFirestore();
  useEffect(() => {
    return onAuthStateChanged(auth, setUsers);
  }, []);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setUsers(user);
  //     setIsLoading(false);
  //   }
  // });
  const onLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUsers(user);
      setIsLoading(false);
    } catch (e) {
      const er = e.code;
      console.log(er);
      if (!email || er === "auth/invalid-email") {
        setIsLoading(false);
        setError("Invalid Email");
        return;
      }
      if (er === "auth/user-not-found") {
        setIsLoading(false);
        setError("User Not Exist");
        return;
      }
      if (!password) {
        setIsLoading(false);
        setError("Please fill the Password field");
        return;
      }
      if (!email || er === "auth/wrong-password") {
        setIsLoading(false);
        setError("Wrong Password");
        return;
      }
      if (er === "auth/invalid-argument") {
        setIsLoading(false);
        setError(
          "An invalid argument was provided to an Authentication method"
        );
        return;
      }
      if (er === "auth/internal-error") {
        setIsLoading(false);
        setError("Please check the credentials");
        return;
      } else {
        setIsLoading(false);
        setError("something went wrong");
        return;
      }
    }
  };

  const onRegister = async (
    email,
    password,
    repeatedPassword,
    name,
    address,
    city,
    state,
    phoneNumber
  ) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUsers(user);
      setIsLoading(false);
      await setDoc(doc(firestore, "users", user.uid), {
        email: email,
        name: name,
        address: address,
        city: city,
        state: state,
        phoneNumber: phoneNumber,
      });
    } catch (e) {
      const er = e.code;
      console.log(er);
      if (name.length < 4) {
        setIsLoading(false);
        setError("Enter a Proper Name");
        return;
      }
      if (phoneNumber.length < 10) {
        setIsLoading(false);
        setError("Please enter a valid Phone Number");
        return;
      }
      if (!address.length) {
        setIsLoading(false);
        setError("Ivalid address");
        return;
      }
      if (!email || er === "auth/invalid-email") {
        setIsLoading(false);
        setError("Invalid Email");
        return;
      }
      if (er === "auth/weak-password") {
        setIsLoading(false);
        setError("Password must be 6 characters long");
        return;
      }
      if (!password) {
        setIsLoading(false);
        setError("Please fill the Password field");
        return;
      }
      if (!repeatedPassword) {
        setIsLoading(false);
        setError("Please type the Confirm Password field");
        return;
      }
      if (password !== repeatedPassword) {
        setIsLoading(false);
        setError("Error: Passwords do not match");
        return;
      }
      if (er === "auth/email-already-in-use") {
        setIsLoading(false);
        setError("Email already in use !");
        return;
      }

      if (er === "auth/invalid-argument") {
        setIsLoading(false);
        setError(
          "An invalid argument was provided to an Authentication method"
        );
        return;
      }
      if (er === "auth/internal-error") {
        setIsLoading(false);
        setError("Please check the credentials");
        return;
      } else {
        setIsLoading(false);
        setError("something went wrong");
        return;
      }
    }
  };
  const onLogout = () => {
    setUsers(null);
    signOut(auth);
  };
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!users,
        users,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        auth,
        firestore,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
