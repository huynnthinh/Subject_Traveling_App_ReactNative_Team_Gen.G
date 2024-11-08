import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FacilityScreen = () => {
  const facilities = [
    { id: "1", name: "Wifi", icon: "wifi" },
    { id: "2", name: "Kitchen", icon: "restaurant" },
    { id: "3", name: "Exercise equipment", icon: "barbell" },
    { id: "4", name: "Pool", icon: "water" },
    { id: "5", name: "Garden", icon: "leaf" },
  ];

  const facilities1 = [
    {
      id: "1",
      name: "Washer",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ZDhgv7g2fJBZclN0wThTnJ1MhVG5H7fnHJSlqyVMizhJYOztzx4EJK0BcuFIomcprio&usqp=CAU",
    },
    {
      id: "2",
      name: "Free dryer - In unit",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ZDhgv7g2fJBZclN0wThTnJ1MhVG5H7fnHJSlqyVMizhJYOztzx4EJK0BcuFIomcprio&usqp=CAU",
    },
    {
      id: "3",
      name: "Iron",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6aDJwiqKhVfF-4LiwW0iVTIImrrfWuXRL-s3xXo6znvX-f8ZNiIyMPhk48eVdLfKGTVg&usqp=CAU",
    },
  ];

  const facilities2 = [
    {
      id: "1",
      name: "Bathtub",
      icon: "https://emojigraph.org/media/microsoft/bathtub_1f6c1.png",
    },
    {
      id: "2",
      name: "Hair dryer",
      icon: "https://cdn-icons-png.freepik.com/512/2460/2460791.png",
    },
  ];

  const FacilityItem = ({ name, icon }) => (
    <View style={styles.itemContainer}>
      <Ionicons name={icon} color="black" style={styles.icon} />
      <Text style={styles.itemText}>{name}</Text>
    </View>
  );

  const FacilityItem1 = ({ name, icon }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: icon }} style={styles.image} />
      <Text style={styles.itemText1}>{name}</Text>
    </View>
  );

  const FacilityItem2 = ({ name, icon }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: icon }} style={styles.image} />
      <Text style={styles.itemText1}>{name}</Text>
    </View>
  );
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={24} color="#78797D" />
        </TouchableOpacity>
        <Text style={styles.title}>Facilities & Services</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Danh sách đầu tiên */}
        <View>
          <Text style={styles.itemOne}>Facilities</Text>
          <View style={styles.interior}>
            <Text style={styles.textInterior}>2 Guests</Text>
            <Text style={styles.textInterior}>1 bedroom</Text>
            <Text style={styles.textInterior}>1 bed</Text>
            <Text style={styles.textInterior}>1 bath</Text>
          </View>
          <View style={styles.service}>
            {facilities.map((item) => (
              <View key={item.id}>
                <FacilityItem name={item.name} icon={item.icon} />
                <View style={styles.separator} />
              </View>
            ))}
          </View>
        </View>

        {/* Danh sách thứ hai */}
        <View>
          <Text style={styles.itemOne1}>Services</Text>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 13 }}>
            Cleaning & laundry
          </Text>
          <View style={styles.service}>
            {facilities1.map((item) => (
              <View key={item.id}>
                <FacilityItem1 name={item.name} icon={item.icon} />
                <View style={styles.separator} />
              </View>
            ))}
          </View>
        </View>
        {/* Danh sách thứ 3 */}
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginBottom: 5,
              marginTop: 20,
            }}
          >
            Bathtub
          </Text>
          <View style={styles.service}>
            {facilities2.map((item) => (
              <View key={item.id}>
                <FacilityItem2 name={item.name} icon={item.icon} />
                <View style={styles.separator} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "#78797D",
  },
  itemOne: {
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: 18,
  },
  itemOne1: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 25,
    marginTop: 30,
  },
  interior: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    padding: 10,
  },
  textInterior: {
    color: "#78797D",
    fontSize: 16,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    marginLeft: 10,
  },
  icon: {
    marginRight: 15,
    fontSize: 26,
  },
  image: {
    width: 25,
    height: 25,
  },
  itemText: {
    fontSize: 16,
    color: "#78797D",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  itemText1: {
    marginLeft: 20,
    fontSize: 16,
    color: "#78797D",
  },
});

export default FacilityScreen;
