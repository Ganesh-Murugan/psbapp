import React from "react";
import { Text } from "react-native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { Ionicons } from "@expo/vector-icons";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StatusBar } from "react-native";
import { ShopListScreen } from "./src/features/shoplist/screens/ShopList.screen";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme/index";
import { SafeArea } from "./src/components/utility/safe-area.component";
import { ShopsContextProvider } from "./src/services/shopDetails/shops.context";

const MapScreen = () => (
  <SafeArea>
    <Text>Map</Text>
  </SafeArea>
);

const SettingsScreen = () => (
  <SafeArea>
    <Text>Settings</Text>
  </SafeArea>
);

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Map: "map",
  Settings: "settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

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
        <StatusBar translucent backgroundColor="black" />
        <ShopsContextProvider>
          <NavigationContainer>
            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen
                name="Home"
                component={ShopListScreen}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ headerShown: false }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </ShopsContextProvider>
      </ThemeProvider>
    </>
  );
}
