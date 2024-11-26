// HomeScreen1.js

import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "./includes/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, updateItemSelection } from "../data/dataSlice";

const HomeScreen1 = () => {
  const navigation = useNavigation();
  const buttonFooterState = "Search";
  const buttonName = [
    { name: "Beach", icon: "umbrella-beach" },
    { name: "Mountain", icon: "mountain" },
    { name: "Camping", icon: "campground" },
  ];
  const route = useRoute();
  const { selectedDate, guests, numberOfBeds } = route.params; // Số giường từ thông tin tìm kiếm
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.data);
  const [buttonState, setButtonState] = useState("Beach");

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const renderButton = ({ item }) => {
    const isSelected = item.name === buttonState;
    return (
      <View
        style={{
          flex: 1,
          borderBottomWidth: 5,
          borderBottomColor: isSelected ? "#41cbda" : "#ebfdff",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 30,
          }}
          onPress={() => setButtonState(item.name)}
        >
          <FontAwesome5
            name={item.icon}
            size={20}
            color={isSelected ? "#41cbda" : "grey"}
            style={{ marginBottom: 5 }}
          />
          <Text style={{ color: isSelected ? "#41cbda" : "grey" }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 20 }}>
        <TouchableOpacity
          style={{
            marginVertical: 20,
            position: "absolute",
            zIndex: 1,
            right: 20,
            backgroundColor: "white",
            height: 40,
            width: 40,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            dispatch(updateItemSelection(item.id));
          }}
        >
          <AntDesign
            name={item.isSelected ? item.icon1 : item.icon}
            size={20}
            color={item.isSelected ? "red" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RoomScreen", { item });
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 350, height: 350, borderRadius: 10 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Entypo name="star" size={15} color="#ebd067" />
              <Text>{item.evaluated}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Text>{item.type}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>${item.price}</Text>
              <Text style={{ color: "grey" }}>/night</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text style={{ fontStyle: "italic", color: "grey" }}>
              {item.bedrooms} bedroom
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Feather
            name="search"
            size={20}
            color="grey"
            style={{ position: "absolute", top: 15, left: 15, zIndex: 1 }}
          />

          <TextInput
            placeholder="Where do you want to stay?"
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "grey",
              paddingLeft: 40,
            }}
            value={`Ngày: ${selectedDate}, Khách: ${guests}`}
            onPress={() => navigation.navigate("SearchScreen")}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={buttonName}
            renderItem={renderButton}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.buttonContainer}
          />
        </View>
      </View>
      <View style={styles.body}>
        <FlatList
          data={items.filter((item) => item.bedrooms >= numberOfBeds)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
      <Footer buttonFooterState={buttonFooterState} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    flex: 2,
    backgroundColor: "#ebfdff",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  body: {
    flex: 7,
    backgroundColor: "white",
  },
});

export default HomeScreen1;
