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
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

export default function Profil() {
  const navigation = useNavigation();

  const getAccount = async () => {
    const localAccount = await AsyncStorage.getItem("account");
    setAccount(JSON.parse(localAccount));
    return JSON.parse(localAccount);
  };
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState();
  const [newUsername, setNewUsername] = useState();

  const [account, setAccount] = useState(getAccount() || null);

  const handleNewPassword = password => {
    setNewPassword(password);
  };

  const handleChangeUsername = text => {
    setNewUsername(text);
  };

  const handleNewPasswordConfirmation = password => {
    setNewPasswordConfirmation(password);
  };
  const handleSubmit = () => {
    axios
      .put("https://happy-vegan-api.herokuapp.com/api/user/edit", {
        token: account.token && account.token,
        username: newUsername
      })
      .then(response => {
        console.log(response.data);
        AsyncStorage.setItem("account", JSON.stringify(response.data));
        getAccount();
        console.log(account);
        navigation.replace("Home");
        //console.log(response.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getAccount();
  }, []);

  return (
    <View>
      <Text>Changer votre username </Text>

      <TextInput
        style={{
          height: 40,
          width: 55,
          borderColor: "gray",
          borderWidth: 1,
          justifyContent: "center"
        }}
        onChangeText={text => handleChangeUsername(text)}
        value={newUsername}
        placeholder={account.account && account.account.username}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text>Enregistrer</Text>
      </TouchableOpacity>

      {/*
      <Text>Changer votre mot de passe</Text>
      
      <Text>Nouveau mot de passe </Text>
      <Text>{account.token}</Text>
      <TextInput
        style={{
          height: 40,
          width: 55,
          borderColor: "gray",
          borderWidth: 1,
          justifyContent: "center"
        }}
        onChangeText={text => handleNewPassword(text)}
        value={newPassword}
      />
      <Text>Réécrire nouveau mot de passe </Text>

      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => handleNewPasswordConfirmation(text)}
        value={newPasswordConfirmation}
      />
      */}
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
