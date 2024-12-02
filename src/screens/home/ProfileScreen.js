import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { updateInf, updatePassword } from "../data/dataSlice";

const ProfileScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  const navigation = useNavigation();
  const { account } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(account.name);
  const [address, setAddress] = useState(account.diachi);
  useEffect(() => {
    setUsername(account.name);
    setAddress(account.diachi);
  }, [account]);
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    if (currentPassword === account.password) {
      dispatch(updatePassword({ accountId: account.id, password: newPassword }))
        .unwrap()
        .then(() => {
          Alert.alert(
            "Password Changed",
            "Your password has been changed successfully."
          );
          // Reset form fields
          setCurrentPassword("");
          setNewPassword("");
          setShowForm(false);
        })
        .catch((error) => {
          Alert.alert(
            "Error",
            "Failed to change password." +
              account.id +
              " " +
              newPassword +
              " " +
              account.password
          );
        });
    } else {
      Alert.alert("Error", "Current password is incorrect.");
    }
  };

  const handleLogout = async () => {
    // await AsyncStorage.removeItem("userToken");
    navigation.navigate("LoginScreen");
  };

  const handleEditProfile = () => {
    if (!username || !address) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    dispatch(
      updateInf({ accountId: account.id, name: username, diachi: address })
    );
    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully."
    );
    // Reset form fields
    setUsername("");
    setAddress("");
    setShowEditProfile(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={30} color="#00796b" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Profile</Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => setShowAccountInfo(!showAccountInfo)}
      >
        <Text style={styles.menuText}>Personal Information</Text>
      </TouchableOpacity>

      {showAccountInfo && (
        <View style={styles.accountInfoContainer}>
          <Text style={styles.accountInfoText}>Name: {account.name}</Text>
          <Text style={styles.accountInfoText}>Email: {account.email}</Text>
          <Text style={styles.accountInfoText}>Phone: {account.phone}</Text>
          {account.diachi && (
            <Text style={styles.accountInfoText}>
              Address: {account.diachi}
            </Text>
          )}
        </View>
      )}

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

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => setShowEditProfile(!showEditProfile)}
      >
        <Text style={styles.menuText}>Edit Profile</Text>
      </TouchableOpacity>

      {showEditProfile && (
        <View style={styles.inputContainer}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            style={styles.textInput}
          />
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("BookedRoomsScreen")}
      >
        <Text style={styles.menuText}>Booked Rooms</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: 20,
    textAlign: "center",
  },
  accountInfoContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },
  accountInfoText: {
    fontSize: 18,
    color: "#00796b",
    marginBottom: 5,
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
