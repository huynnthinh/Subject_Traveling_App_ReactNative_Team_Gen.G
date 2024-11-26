import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "./includes/Footer";

const ProfileScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigation = useNavigation();

  const handleChangePassword = () => {
    Alert.alert(
      "Password Changed",
      "Your password has been changed successfully."
    );
    // Reset form fields
    setCurrentPassword("");
    setNewPassword("");
    setShowForm(false);
  };

  const handleLogout = async () => {
    // await AsyncStorage.removeItem("userToken");
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Profile</Text>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => setShowForm(!showForm)}
      >
        <Text style={styles.menuText}>Change Password</Text>
      </TouchableOpacity>

      {showForm && (
        <View style={styles.inputContainer}>
          <TextInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current Password"
            secureTextEntry
            style={styles.textInput}
          />
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry
            style={styles.textInput}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <Footer buttonFooterState="Profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7fa",
    padding: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: 40,
    textAlign: "center",
  },
  menuItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },
  menuText: {
    fontSize: 18,
    color: "#00796b",
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    borderColor: "#00796b",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#f1f8e9",
  },
  button: {
    backgroundColor: "#00796b",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    elevation: 2,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
