import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";

import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";

import checkEmpty from "../function/checkEmpty";
//import getAccount from "../function/getAccount";

import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkPasswordError, setCheckPasswordError] = useState("");

  const navigation = useNavigation();

  const getAccount = async () => {
    const localAccount = await AsyncStorage.getItem("account");
    if (localAccount) {
      setTimeout(() => navigation.replace("Home"));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const postSignUp = () => {
    checkEmpty("username", username, setUsernameError);
    checkEmpty("email", email, setEmailError);
    checkEmpty("password", password, setPasswordError);
    checkEmpty("checkPassword", checkPassword, setCheckPasswordError);

    if (
      username === null ||
      email === null ||
      password === null ||
      checkPassword !== password
    )
      return;

    axios
      .post("https://happy-vegan-api.herokuapp.com/api/user/sign_up", {
        username: username,
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
        placeholder="username"
        type="text"
        onChangeText={e => setUsername(e)}
      />
      {!!usernameError && (
        <Text style={{ color: "yellow" }}>{usernameError}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="email"
        type="text"
        onChangeText={e => setEmail(e)}
      />
      {!!emailError && <Text style={{ color: "red" }}>{emailError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="password"
        type="password"
        secureTextEntry
        onChangeText={e => setPassword(e)}
      />
      {!!passwordError && <Text style={{ color: "red" }}>{passwordError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="password"
        type="password"
        secureTextEntry
        onChangeText={e => setCheckPassword(e)}
      />
      {!!checkPasswordError && (
        <Text style={{ color: "red" }}>{checkPasswordError}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={postSignUp}>
        <Text>Création du compte</Text>
      </TouchableOpacity>
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
