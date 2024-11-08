import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "./includes/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, updateItemSelection } from "../data/dataSlice";
const FavoriteScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.data);
  const buttonFooterState = "Favorites";
  // useEffect(() => {
  //   dispatch(fetchItems());
  // }, []);
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
        <TouchableOpacity>
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
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={30} color="#afbdc4" />
        </TouchableOpacity>

        <Text style={{ color: "#afbdc4", fontSize: 20, fontWeight: "bold" }}>
          Favorites
        </Text>
        <TouchableOpacity>
          <AntDesign name="bars" size={30} color="#afbdc4" />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Places you liked
        </Text>
      </View>
      <View style={{ flex: 7 }}>
        <FlatList
          data={items.filter((item) => item.isSelected)}
          renderItem={renderItem}
          contentContainerStyle={{ alignItems: "center" }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <Footer buttonFooterState={buttonFooterState} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default FavoriteScreen;
