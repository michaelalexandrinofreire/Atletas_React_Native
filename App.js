import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Favoritos from "./screens/Favoritos";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "rgb(34, 197, 94)",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Atletas"
          component={Home}
        />
        <Stack.Screen
          name="Favoritos"
          component={Favoritos}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
