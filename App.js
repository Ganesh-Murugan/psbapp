import React from "react";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { StatusBar } from "react-native";
import { initializeApp, FirebaseApp, getApps, getApp } from "firebase/app";
import { Auth, getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";

import { Navigation } from "./src/infrastructure/navigation";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme/index";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

const firebaseConfig = {
  apiKey: "AIzaSyCTbVpib5QnpgNZp3PVWF3sOIYGR5nFCXw",
  authDomain: "booking-app-16723.firebaseapp.com",
  projectId: "booking-app-16723",
  storageBucket: "booking-app-16723.appspot.com",
  messagingSenderId: "378046707721",
  appId: "1:378046707721:web:584beaac52af22bed960d8",
};

let firebaseApp = FirebaseApp;
let fireAuth = Auth;
if (getApps().length < 1) {
  firebaseApp = initializeApp(firebaseConfig);
  fireAuth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  firebaseApp = getApp();
  fireAuth = getAuth();
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });
  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <StatusBar translucent backgroundColor="black" />
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
    </>
  );
}
