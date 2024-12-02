import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { registerAccount } from "../data/dataSlice";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { status, erorr } = useSelector((state) => state.data);
  const navigation = useNavigation();

  const validateAndRegister = () => {
    const nameRegex = /^[^0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    if (!nameRegex.test(name)) {
      Alert.alert(
        "Validation Error",
        "Name can only contain letters and spaces."
      );
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Invalid email address.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      Alert.alert(
        "Validation Error",
        "Invalid phone number only 10 characters."
      );
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 8 characters long and contain both letters and numbers."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }

    const accountData = { name, email, phone, password };
    dispatch(registerAccount(accountData))
      .unwrap()
      .then(() => {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("LoginScreen");
      })
      .catch((err) => {
        Alert.alert("Registration Error", err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={validateAndRegister}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={{ fontSize: 16, color: "grey" }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={{ color: "#00bcd4", fontSize: 16, marginLeft: 5 }}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#00bcd4",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterScreen;
