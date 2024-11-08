import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigation/Navigation";
import { Provider } from "react-redux";
import store from "./src/screens/data/store";
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Navigation />
    </Provider>
  );
}
