import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  Login,
  Signup,
  ForgetPassword,
  Profil,
  Photo,
  PhotoPicker,
  CameraApp
} from "./container";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // const localAccount = AsyncStorage.getItem("account");
  });
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Profil" component={Profil} />

        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="Connected" component={ForgetPassword} />
        <Stack.Screen name="Photo" component={Photo} />
        <Stack.Screen name="PhotoPicker" component={PhotoPicker} />
        <Stack.Screen name="CameraApp" component={CameraApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
