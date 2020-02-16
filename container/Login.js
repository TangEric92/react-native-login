import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import checkEmpty from "../function/checkEmpty";
import Constants from "expo-constants";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation();

  const handleMail = email => {
    setEmail(email);
  };

  const handlePassword = password => {
    setPassword(password);
  };

  const handleSubmit = () => {
    checkEmpty("email", email, setEmailError);
    checkEmpty("password", password, setPasswordError);
    if (!email || !password) return;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleMail}
      />
      {!!emailError && <Text style={{ color: "red" }}>{emailError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={handlePassword}
      />
      {!!passwordError && <Text style={{ color: "red" }}>{passwordError}</Text>}

      <Text
        style={styles.link}
        onPress={() => navigation.navigate("ForgetPassword")}
      >
        Mot de passe oublié
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text>Connexion</Text>
      </TouchableOpacity>

      <Text style={[styles.link]} onPress={() => navigation.navigate("Signup")}>
        Création d'un compte
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Constants.statusBarHeight },
  input: {
    color: "white",
    fontSize: 24,
    height: 54,
    width: "75%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingLeft: 15
  },
  link: {
    color: "blue"
  },
  button: {
    height: 70,
    backgroundColor: "white",
    width: "75%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  }
});
