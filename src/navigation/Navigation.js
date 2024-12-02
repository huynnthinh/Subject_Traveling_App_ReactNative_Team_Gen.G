import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/authentication/LoginScreen";
import Index from "../screens/Index.js";
import HomeScreen from "../screens/home/HomeScreen";
import FavoriteScreen from "../screens/home/FavoriteScreen.js";
import SearchScreen from "../screens/home/SearchScreen.js";
import RoomScreen from "../screens/home/RoomScreen.js";
import ReviewScreen from "../screens/home/ReviewScreen.js";
import FacilityScreen from "../screens/home/FacilityScreen.js";
import InboxScreen from "../screens/home/InboxScreen.js";
import HomeScreen1 from "../screens/home/AfterSearchScreen.js";
import MyScreen from "../screens/home/ConfirmAndPay.js";
import PaymentScreen from "../screens/home/PaymentScreen.js";
import ProfileScreen from "../screens/home/ProfileScreen.js";
import RegisterScreen from "../screens/authentication/RegisterScreen.js";
const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Index"
          component={Index}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FavoriteScreen"
          component={FavoriteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoomScreen"
          component={RoomScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReviewScreen"
          component={ReviewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilityScreen"
          component={FacilityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InboxScreen"
          component={InboxScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen1"
          component={HomeScreen1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmScreen"
          component={MyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
