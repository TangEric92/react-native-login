import { AsyncStorage } from "react-native";

const getAccount = async () => {
  const localAccount = await AsyncStorage.getItem("account");
  return localAccount;
};

export default getAccount;
