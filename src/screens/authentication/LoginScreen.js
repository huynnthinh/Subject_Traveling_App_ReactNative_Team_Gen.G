import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Picker from "react-native-picker-select";
import AntDesign from "react-native-vector-icons/AntDesign";
const LoginScreen = () => {
  const [countryCode, setCountryCode] = useState("+84");

  const countryCodes = [
    {
      label: "Vietnam (+84)",
      value: "+84",
      image: require("../../../assets/images/vn.png"),
    },
    {
      label: "United States (+1)",
      value: "+1",
      image: require("../../../assets/images/us.png"),
    },
    {
      label: "United Kingdom (+44)",
      value: "+44",
      image: require("../../../assets/images/uk.png"),
    },
  ];
  const selectedCountry = countryCodes.find(
    (country) => country.value == countryCode
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.text, { fontWeight: "bold" }]}>
          Create an account
        </Text>
      </View>
      <View style={styles.middle}>
        <View>
          <Text style={[styles.text, { color: "#78787a" }]}>
            Enter your mobile number:
          </Text>
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Picker
            onValueChange={(value) => setCountryCode(value)}
            items={countryCodes.map((countryCode) => ({
              label: countryCode.label,
              value: countryCode.value,
            }))}
            value={countryCode}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f3f4f6",
                height: 50,
                width: 100,
                justifyContent: "space-around",
              }}
            >
              {selectedCountry ? (
                <Image
                  source={selectedCountry.image}
                  style={{ height: 30, width: 40 }}
                />
              ) : (
                <Image
                  source={countryCodes[0].image}
                  style={{ height: 30, width: 40 }}
                />
              )}
              <AntDesign name="down" size={20} color="#000" />
            </View>
          </Picker>
          <TextInput
            placeholder={
              selectedCountry
                ? selectedCountry.value + " Mobile number"
                : countryCodes[0].value + " Mobile number"
            }
            style={[styles.textInput, styles.text]}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#00bcd4" }]}
        >
          <Text style={[styles.text, { color: "white" }]}>Continue</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
        <Text style={{ color: "grey" }}>or</Text>
      </View>
      <View>
        <View>
          <AntDesign
            name="apple1"
            size={30}
            color="#343538"
            style={{ position: "absolute", zIndex: 1, left: 60, top: 7 }}
          />
          <TouchableOpacity
            style={[styles.button, { borderWidth: 1, borderColor: "#343538" }]}
          >
            <Text style={[styles.text, { color: "#343538" }]}>
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <AntDesign
            name="facebook-square"
            size={30}
            color="#3999e1"
            borderRadius="50%"
            style={{
              position: "absolute",
              zIndex: 1,
              left: 45,
              top: 7,
            }}
          />
          <TouchableOpacity
            style={[styles.button, { borderWidth: 1, borderColor: "#3999e1" }]}
          >
            <Text style={[styles.text, { color: "#3999e1" }]}>
              Continue with Facebook
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <AntDesign
            name="google"
            size={30}
            color="#ce5154"
            style={{ position: "absolute", zIndex: 1, left: 60, top: 7 }}
          />
          <TouchableOpacity
            style={[styles.button, { borderWidth: 1, borderColor: "#ce5154" }]}
          >
            <Text style={[styles.text, { color: "#ce5154" }]}>
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flex: 1,
  },
  middle: {
    flex: 2,
    justifyContent: "space-around",
  },
  text: {
    fontSize: 20,
  },
  textInput: {
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    marginLeft: 20,
    paddingLeft: 20,
  },
  button: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default LoginScreen;