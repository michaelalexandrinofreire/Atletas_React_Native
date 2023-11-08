import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

  function navigateToHome() {
    navigation.navigate('Atletas')
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(37 99 235)",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "rgb(234 179 8)",
          height: 40,
          marginTop: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={navigateToHome}
      >
        <Text
          style={{
            color: "white",
            fontSize: 14,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Entrar na conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}
