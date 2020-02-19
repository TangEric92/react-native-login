import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import checkEmpty from "../function/checkEmpty";
import Constants from "expo-constants";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
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
  const getAccount = async () => {
    const localAccount = await AsyncStorage.getItem("account");
    if (localAccount) {
      setTimeout(() => navigation.replace("Home"));
    }
  };
  useEffect(() => {
    getAccount();
  }, []);

  const handleSubmit = () => {
    checkEmpty("email", email, setEmailError);
    checkEmpty("password", password, setPasswordError);
    if (!email || !password) return;

    axios
      .post("https://happy-vegan-api.herokuapp.com/api/user/log_in", {
        password: password,
        email: email
      })
      .then(response => {
        AsyncStorage.setItem("account", JSON.stringify(response.data));
        navigation.replace("Home");
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleMail}
      />
      {!!emailError && <Text style={{ color: "yellow" }}>{emailError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={handlePassword}
      />
      {!!passwordError && (
        <Text style={{ color: "yellow" }}>{passwordError}</Text>
      )}

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
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
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
