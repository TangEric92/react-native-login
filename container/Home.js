import React, { useEffect, useState } from "react";
import { View, Text, AsyncStorage, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Signup, Login } from ".";

export default function Home() {
  const [account, setAccount] = useState();
  const navigation = useNavigation();

  const getAccount = async () => {
    const stored = await AsyncStorage.getItem("account");
    const localAccount = JSON.parse(stored);
    if (localAccount) {
      setAccount(localAccount);
    }
  };
  const deleteAccount = async () => {
    const stored = await AsyncStorage.removeItem("account");
    setAccount();
  };

  useEffect(() => {
    getAccount();
  }, [account]);

  if (account) {
    return (
      <View>
        <Text>Bonjour {account.account.username}</Text>
        <TouchableOpacity
          onPress={() => {
            deleteAccount();
          }}
        >
          <Text>Se deconnecter</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Bonjour et Bienvenue</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(Signup);
        }}
      >
        <Text style={styles.text}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(Login);
        }}
      >
        <Text style={styles.text}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 200,
    backgroundColor: "red",
    padding: 20,
    borderRadius: 5,
    marginBottom: 30,
    borderColor: "grey"
  },
  text: {
    alignSelf: "center",
    color: "white"
  }
});
