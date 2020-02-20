import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Constants from "expo-constants";
import checkEmpty from "../function/checkEmpty";

export default function Profil() {
  const getAccount = async () => {
    const localAccount = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(localAccount));
    return JSON.parse(localAccount);
  };
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState();
  const [account, setAccount] = useState(getAccount() || null);
  const handleNewPassword = password => {
    setNewPassword(password);
  };

  const handleNewPasswordConfirmation = password => {
    setNewPasswordConfirmation(password);
  };
  const handleSubmit = () => {
    checkEmpty("email", email, setEmailError);
    checkEmpty("password", password, setPasswordError);
  };
  useEffect(() => {
    getAccount();
    // console.log(localAccount);
  }, []);

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value=""
      />
      <Text>Changer votre mot de passe</Text>
      <Text>Nouveau mot de passe </Text>
      <Text>{account.token}</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => handleNewPassword(text)}
        value={newPassword}
      />
      <Text>Réécrire nouveau mot de passe </Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => handleNewPasswordConfirmation(text)}
        value={newPasswordConfirmation}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text>Modifier le mot de passe</Text>
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
  }
});
